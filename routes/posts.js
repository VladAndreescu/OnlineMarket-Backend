const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

//Load Post Model 
const Post = require('../src/posts/models/Post')

//Load User Model
const User = require('../src/users/models/User')

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

//@route 	GET api/posts
//@desc 	Get all posts
//access 	Public
router.get('/', (req,res) =>{
	Post.find()
		.sort({date: -1})
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({error: 'No posts found'}))
})

//@route 	GET api/posts/:id
//@desc 	Get a specific post by id
//access 	Public
router.get('/:id', (req, res) =>{
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => res.status(404).json({error: 'No post found with id provided'}))
})

//@route 	DELETE api/posts/:id
//@desc 	Delete a specific post by id
//access 	Private
router.delete('/:id',passport.authenticate('jwt', {session: false}) ,(req, res) =>{
	User.findOne({id: req.user.id})
		.then(user =>{
			Post.findById(req.params.id)
				.then(post =>{
					//Check if the current logged in user is the owner of the post
					if(post.user.toString() !== req.user.id){
						return res.status(401).json({error: 'User is not authorized to perform this action!'})
					}

					//Delete the post
					post.remove()
						.then(() => res.json({ success: true, message: 'Post deleted'}))
				})
				.catch(err => res.status(404).json({error: 'Post could not be found with that ID'}))
		})
		
})

//@route 	POST api/posts/like/:id
//@desc 	Like post
//access 	Private
router.post('/like/:id',passport.authenticate('jwt', {session: false}) ,(req, res) =>{
	User.findOne({id: req.user.id})
		.then(user =>{
			Post.findById(req.params.id)
				.then(post =>{
					//check if the user already liked the post
					if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
						return res.status(400).json({error: 'You cannot like the post more than once'})
					}
					
					//Add the user id to the likes array
					post.likes.unshift({ user: req.user.id })
					
					post.save()
						.then(post => res.json(post))

					
				})
				.catch(err => res.status(404).json({error: 'Post could not be found with that ID'}))
		})
		
})

//@route 	POST api/posts/unlike/:id
//@desc 	Like post
//access 	Private
router.post('/unlike/:id',passport.authenticate('jwt', {session: false}) ,(req, res) =>{
	User.findOne({id: req.user.id})
		.then(user =>{
			Post.findById(req.params.id)
				.then(post =>{
					//check if the user already liked the post
					if(post.likes.filter(like => like.user.toString() === req.user.id).length == 0){
						return res.status(400).json({error: 'You cannot remove the like if you did not liked this post'})
					}
					
					//Get the delete index
					const deleteIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id)

					//remove the user from the likes array
					post.likes.splice(deleteIndex, 1);

					//Save the new updated post
					post.save().then(post => res.json(post))

					
				})
				.catch(err => res.status(404).json({error: 'Post could not be found with that ID'}))
		})
		
})






module.exports = router