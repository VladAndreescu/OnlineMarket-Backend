'use strict'

const express = require('express')
const BodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')

const users = require('./routes/users')
const posts = require('./routes/posts')

const app = express()



//Database confuguration and connection
const db = require('./config/keys').MongoDbURI

mongoose.connect(db)
		.then(() => console.log('Mongo Database connected!'))
		.catch(err => console.log(err))


//use Body parser
app.use(BodyParser.urlencoded({extended:false}))
app.use(BodyParser.json())

//use Passport
app.use(passport.initialize())

//Passport Strategy
require('./config/passport')(passport);



//Server listening
const port = 5000;

//Declaring Routes
app.use('/api/users', users)
app.use('/api/posts', posts)

app.listen(port, () => console.log(`Server is currently running on port: ${port}`))