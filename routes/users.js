const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../src/users/models/User')


const SALT_ROUNDS = 10
router.get('/test', (req, res ) => res.json({msg: 'users router is working fine'}))

//@route POST api/users/register
//@desc Register an user
//@acccess Public
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


module.exports =  router