const mongoose = require('mongoose');

var collectionName = 'ItemInfo';

var itemInfoSchema = new mongoose.Schema({
	item_id: {
		type: Number
	},
	list_id: {
		type: Number
	},
	address: {
		type: String
	},
	address_map: {
    	type: String
    },
	price: {
		type: Number
	}
});

mongoose.model('ItemInfo', itemInfoSchema,collectionName);
