const mongoose = require('mongoose');

var collectionName = 'Slider';

var sliderSchema = new mongoose.Schema({
	slider_id: {
		type: Number
	},
	slider_photo: {
		type: String
	}
});

mongoose.model('Slider', sliderSchema,collectionName);
