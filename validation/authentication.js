const Validator = require('validator')
const isEmpty = require('../validation/isEmpty')



module.exports = function validateUserAuthenticationInput(data){
	let errors = {}

	//check to see if the data provided is not empty
	// if it is convert it into a string
	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''
	
	//inputs validations

	//Email validations
	if(!Validator.isEmail(data.email)){
		errors.email = 'Email input does not have email format!'
	}

	if(Validator.isEmpty(data.email)){
		errors.email = 'Email field cannot be empty!'
	}

	//Password validations
	if(Validator.isEmpty(data.password)){
		errors.password = 'Passowrd field cannot be empty!'
	}

	

	return{
		errors,
		isValid: isEmpty(errors)
	}
}