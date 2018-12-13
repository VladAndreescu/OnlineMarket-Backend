const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

//Load Post Model 
const Post = require('../src/posts/models/Post')

//Validation

const validatePostInput = require('../validation/post')

//@route 	POST api/posts
//@desc 	create a new post
//access 	Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) =>{
	
	const {errors, isValid} = validatePostInput(req.body)

	//Validation
	if(!isValid){
		//If there are any errors return 400 status and error message
		return res.status(404).json(errors)
	}

	const newPost = new Post({
		name: req.body.name,
		category: req.body.category,
		description: req.body.description,
		item_condition: req.body.item_condition,
		asked_price: req.body.asked_price,
		city: req.body.city,
		user: req.user.id
	})

	newPost.save()
		.then(post => res.json(post))
		.catch(err => console.log(err))
})

module.exports = router