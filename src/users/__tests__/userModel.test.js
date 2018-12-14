const mongoose = require('mongoose')
const testUserDB = require('../../../config/keys').testUsersMongURI
mongoose.connect(testUserDB)
const User = require('../models/User')


describe('Test user model', () =>{
	
})