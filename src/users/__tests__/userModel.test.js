const mongoose = require('mongoose')
const testUserDB = require('../../../config/keys').testUsersMongURI
mongoose.connect('mongodb://snyk:snyk123@ds125402.mlab.com:25402/304cem-users-test-db')
const User = require('../models/User')


describe('Test user model', () =>{
	beforeAll( async() => {
		await User.remove({})
	})

	afterEach( async() => {
		await User.remove({})
	})

	afterAll( async() => {
		await mongoose.connection.close()
	})

	test('has a model', () => {
		expect(User).toBeDefined()
	})

})