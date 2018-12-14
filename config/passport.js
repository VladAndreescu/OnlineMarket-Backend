const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = require('../src/users/models/User')
const keys = require('../config/keys')


//creating the options object
const opts = {}

//Store the Bearer schema in options
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

//store the secret key in options
opts.secretOrKey = keys.secretOrKey


//create the passaport based on the options
module.exports = passport =>{
	passport.use(new JwtStrategy(opts, (jwtPayload, done) =>{
		//check if a user exists based on id provided
		User.findById(jwtPayload.id)
			.then(user =>{
				if(user !== null){
					return done(null, user)
				}
				return done(null, false)
			})
			.catch(err => console.log(err))
	}))
}
