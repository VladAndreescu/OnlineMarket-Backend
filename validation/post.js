const Validator = require('validator')
const isEmpty = require('../validation/isEmpty')



module.exports = function validatePostInput(data){
	let errors = {}


	
	data.category= !isEmpty(data.category) ? data.category : ''
	data.description= !isEmpty(data.description) ? data.description : ''
	data.item_condition= !isEmpty(data.item_condition) ? data.item_condition : ''
	data.asked_price= !isEmpty(data.asked_price) ? data.asked_price : ''
	data.city= !isEmpty(data.city) ? data.city : ''
	
	//Post inputs validations
	if(Validator.isEmpty(data.category)){
		errors.category = 'Category field cannot be empty!'
	}

	if(Validator.isEmpty(data.description)){
		errors.description = 'Description field cannot be empty!'
	}

	if(Validator.isEmpty(data.item_condition)){
		errors.item_condition = 'item_condition field cannot be empty!'
	}

	if(Validator.isEmpty(data.asked_price)){
		errors.asked_price = 'asked_price field cannot be empty!'
	}

	if(Validator.isEmpty(data.city)){
		errors.city = 'city field cannot be empty!'
	}


	

	return{
		errors,
		isValid: isEmpty(errors)
	}
}