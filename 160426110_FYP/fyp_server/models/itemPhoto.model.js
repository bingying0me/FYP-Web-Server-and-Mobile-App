const mongoose = require('mongoose');

var collectionName = 'ItemPhoto';

var itemPhotoSchema = new mongoose.Schema({
	item_id: {
		type: Number
	},
	photo_id: {
		type: Number
	},
	photo: {
		type: String
	}
});

mongoose.model('ItemPhoto', itemPhotoSchema,collectionName);
