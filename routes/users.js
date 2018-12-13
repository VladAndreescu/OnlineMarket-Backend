const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const passport = require('passport')


//Load User Model
const User = require('../src/users/models/User')


const SALT_ROUNDS = 10
router.get('/test', (req, res ) => res.json({msg: 'users router is working fine'}))

//@route 	POST api/users/register
//@desc 	Register an user
//@acccess 	Public
router.post('/register', (req,res) =>{
	User.findOne({email: req.body.email})
		.then(user =>{
			if(user !== null){
				return res.status(400).json({userEmail: 'Email already exists'})
			}else{
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password
				})

				bcrypt.genSalt(SALT_ROUNDS, (err, salt) =>{
					bcrypt.hash(newUser.password, salt, (err, hash) =>{
						if(err){
							throw err
						}

						newUser.password = hash;
						newUser.save()
							.then(user =>res.json(user))
							.catch(err => console.log(err))
					})
				})


			}
		})
})

//@route 	POST api/users/login
//@desc 	Login an existing user
//@acccess 	Public
router.post('/login', (req, res) =>{

	// store the user inputs into variables
	const email = req.body.email
	const password = req.body.password

	//check if the email exists in database
	User.findOne({email})
		.then(user =>{
			if(user === null){
				return res.status(404).json({user: 'User not found'})
			}
			//compare passwords in order to log in the user
			bcrypt.compare(password, user.password)
				.then(isMatch =>{
					if(isMatch){

						//User matched create payload
						const payload = {id: user.id, name: user.name}

						//Create the Sign Token - should expire in 1 hour for security reasons
						jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) =>{
							res.json({
								success: true,
								message: 'Log in successfuly!',
								token: 'Bearer ' + token
							})
						})
					}else{
						return res.status(404).json({passwordError: 'Password incorrect'})
					}
				})
		})
})

//@route 	GET api/users/currentUser
//@desc 	Display the current user
//@acccess 	Private

router.get('/currentUser', passport.authenticate('jwt', {session: false}), (req, res) =>{
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email

	})
})




module.exports =  router