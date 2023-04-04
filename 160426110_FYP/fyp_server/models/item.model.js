const mongoose = require('mongoose');

var collectionName = 'Item';

var itemSchema = new mongoose.Schema({
	item_id: {
		type: Number
	},
	item_name: {
		type: String
	},
	item_type: {
		type: String
	},
	item_info:{
	    type: String
	}
});

mongoose.model('Item', itemSchema , collectionName);
