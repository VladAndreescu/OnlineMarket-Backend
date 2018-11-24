'use strict'

const express = require('express')
const BodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.get('/', (req, res) => res.json({msg: 'it works'}))

//Database confuguration and connection
const db = require('./config/keys').MongoDbURI

mongoose.connect(db)
		.then(() => console.log('Mongo Database connected!'))
		.catch(err => console.log(err))



//Server listening
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is currently running on port: ${port}`))