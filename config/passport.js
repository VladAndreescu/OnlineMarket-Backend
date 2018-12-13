const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = require('../src/users/models/User')
const keys = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport =>{
	passport.use(new JwtStrategy(opts, (jwtPayload, done) =>{
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
