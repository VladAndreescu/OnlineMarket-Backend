const Validator = require('validator')
const isEmpty = require('../validation/isEmpty')



module.exports = function validateBidsInput(data){
	let errors = {}


	
	data.value= !isEmpty(data.value) ? data.value : ''
	data.text= !isEmpty(data.text) ? data.text : ''
	
	
	//Bids inputs validations
	if(Validator.isEmpty(data.value)){
		errors.value = 'Value field cannot be empty!'
	}

	if(Validator.isEmpty(data.text)){
		errors.text = 'Text field cannot be empty!'
	}


	

	return{
		errors,
		isValid: isEmpty(errors)
	}
}