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

	describe('SAVE user', () => {
		test('saves an user', async() => {
			const newUser = new User({ name: 'Oana', email: 'oana@gmail.com', password: 'oana123'})
			const savedUser = await newUser.save()
			expect(savedUser.name).toEqual('Oana')
			expect(savedUser.email).toEqual('oana@gmail.com')

		})
	})

	describe('GET user', () => {
		test('gets an user', async() => {
			const newUser = new User({ name: 'Oana', email: 'oana@gmail.com', password: 'oana123'})
			await newUser.save()

			const foundUser = await User.findOne({ email: 'oana@gmail.com'})
			expect(foundUser.email).toEqual('oana@gmail.com')
			expect(foundUser.name).toEqual('Oana')
		})
	})

	describe('UPDATE user', () => {
		test('update an existing user', async() => {
			const newUser = new User({ name: 'Oana', email: 'oana@gmail.com', password: 'oana123'})
			await newUser.save()

			newUser.email = 'oana123@gmail.com'
			const updatedUser = await newUser.save()
			expect(updatedUser.email).toBe('oana123@gmail.com')
		})
	})
})