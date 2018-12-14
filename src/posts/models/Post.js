const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Create Post Schema

const PostSchema = new Schema({
	user:{
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	name:{
		type: String
	},
	category:{
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	item_condition:{
		type: String,
		required: true
	},
	asked_price:{
		type: String,
		required: true
	},
	city:{
		type: String,
	},
	likes:[
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	offers:[
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			name:{
				type: String
			},
			value:{
				type: String,
				required: true
			},
			text:{
				type:String
			},
			date:{
				type: Date,
				default: Date.now
			}


		}
	],
	date:{
		type: Date,
		default: Date.now
	}

	
})

Post = mongoose.model('posts', PostSchema)
module.exports = Post