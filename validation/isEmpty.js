//Creating a global function isEmpty which check if the values are empty or not

const  isEmpty = (value) => 

		value === null ||
		value === undefined ||
		(typeof value === 'string' && value.trim().length === 0) ||
		(typeof value === 'object' && Object.keys(value).length === 0) 
		
	


module.exports = isEmpty