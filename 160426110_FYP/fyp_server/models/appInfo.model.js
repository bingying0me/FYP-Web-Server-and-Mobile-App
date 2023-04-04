const mongoose = require('mongoose');

var collectionName = 'AppInfo';

var appInfoSchema = new mongoose.Schema({
	name: {
		type: String
	},
	// logo_photo: {
	// 	type: String
	// },
	company: {
		type: String
	},
	phone: {
		type: String
	},
	address: {
        type: String
    },
	email: {
		type: String
	},
	website: {
	    type: String
	},
	facebook: {
	    type: String
	},
	ig: {
	    type: String
	}
    },
    {

    timestamps: true
    });

mongoose.model('AppInfo', appInfoSchema , collectionName);
