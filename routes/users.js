const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const passport = require('passport')


//Load User Model
const User = require('../src/users/models/User')

//Call Validations
const validateUserRegistrationInput = require('../validation/registration')
const validateUserAuthenticationInput = require('../validation/authentication')


const SALT_ROUNDS = 10
router.get('/test', (req, res ) => res.json({msg: 'users router is working fine'}))

//@route 	POST api/users/register
//@desc 	Register an user
//@acccess 	Public
router.post('/register', (req,res) =>{

	//using distructuring in order to extract errors and isValid
	const { errors, isValid} = validateUserRegistrationInput(req.body)

	//Validation
	if(!isValid){
		return res.status(400).json(errors)
	}

	//check if the email already exists in the database
	User.findOne({email: req.body.email})
		.then(user =>{
			if(user !== null){
				//if the email is laready in database throw status 400 and a specific error message
				errors.email = 'Email already exists'
				return res.status(400).json(errors)
			}else{
				//create new user if the email does not exists in the database
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password
				})
				//encrypt password using bcrypt
				bcrypt.genSalt(SALT_ROUNDS, (err, salt) =>{
					bcrypt.hash(newUser.password, salt, (err, hash) =>{
						if(err){
							throw err
						}
						//save the hashed password into newUser's password
						newUser.password = hash;
						//save the user and return the object which contains user's information
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

	//using distructuring in order to extract errors and isValid
	const { errors, isValid} = validateUserAuthenticationInput(req.body)

	//Validation
	if(!isValid){
		return res.status(400).json(errors)
	}

	// store the user inputs into variables
	const email = req.body.email
	const password = req.body.password

	//check if the email exists in database
	User.findOne({email})
		.then(user =>{
			if(user === null){
				//if there is no user with email provided throw status 404 and a specific error message
				errors.email = 'User not found'
				return res.status(404).json(errors)
			}
			//compare passwords in order to log in the user
			bcrypt.compare(password, user.password)
				.then(isMatch =>{
					if(isMatch){

						//User matched create payload
						const payload = {id: user.id, name: user.name, admin: user.admin}

						//Create the Sign Token - should expire in 1 hour for security reasons
						jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) =>{
							res.json({
								success: true,
								message: 'Log in successfuly!',
								token: 'Bearer ' + token
							})
						})
					}else{
						//if the passwords do not match throw status 404 with a specific error message
						errors.password = 'Password incorrect'
						return res.status(404).json(errors)
					}
				})
		})
})

//@route 	GET api/users/currentUser
//@desc 	Display the current user
//@acccess 	Private

router.get('/currentUser', passport.authenticate('jwt', {session: false}), (req, res) =>{
	//test to check if the authentication is working as it should
	//display the object containing the information about the current logged in user
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email,
		admin: req.user.admin

	})
})




module.exports =  router