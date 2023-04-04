const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fyp', {useNewUrlParser: true}, (err) => {
	if (!err) {console.log('MongoDB Connection Succeeded.')}
	else{console.log('Error in DB connection : ' +err)}
});

require('./member.model');
require('./item.model');
require('./itemInfo.model');
require('./itemPhoto.model');
require('./slider.model');
require('./appInfo.model');
require('./staff.model');
