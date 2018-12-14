const Validator = require('validator')
const isEmpty = require('../validation/isEmpty')



module.exports = function validateUserRegistrationInput(data){
	let errors = {}

	//check to see if the data provided is not empty
	// if it is convert it into a string
	data.name = !isEmpty(data.name) ? data.name : ''
	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''
	data.password2 = !isEmpty(data.password2) ? data.password2 : ''
	
	//inputs validations

	//Name validations
	if(Validator.isEmpty(data.name)){
		errors.name = 'Name field cannot be empty!'
	}
	
	if(!Validator.isLength(data.name, {min: 2, max: 15})){
		errors.name = 'Name has to be between 2 and 15 characters'

	}

	//Email validations
	if(Validator.isEmpty(data.email)){
		errors.email = 'Email field cannot be empty!'
	}

	if(!Validator.isEmail(data.email)){
		errors.email = 'Email input does not have email format!'
	}

	//Password validations
	if(Validator.isEmpty(data.password)){
		errors.password = 'Passowrd field cannot be empty!'
	}

	if(!Validator.isLength(data.password,{min: 5, max: 20})){
		errors.password = 'Password has to be between 5 and 20 characters!'
	}
	//Confirm password validations
	if(Validator.isEmpty(data.password2)){
		errors.password2 = 'Password2 field cannot be empty!'
	}

	if(!Validator.equals(data.password, data.password2)){
		errors.password2 = 'Passwords do not match!'
	}

	

	return{
		errors,
		isValid: isEmpty(errors)
	}
}