require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const session = require('express-session');;

const dashboardController = require('./controllers/dashboardController');
const memberController = require('./controllers/memberController');
const itemController = require('./controllers/itemController');
const itemInfoController = require('./controllers/itemInfoController');
const itemPhotoController = require('./controllers/itemPhotoController');
const staffController = require('./controllers/staffController');
// const sliderController = require('./controllers/sliderController');
const appInfoController = require('./controllers/appInfoController');
const loginController = require('./controllers/loginController');


var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app = express();
app.use(express.static(__dirname));
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(bodyparser.json());
app.use(express.static('public'));

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

app.listen(3000, () => {
	console.log('Express server started at port : 3000');
});

app.use('/dashboard', dashboardController)
app.use('/member', memberController)
app.use('/item', itemController)
app.use('/itemInfo', itemInfoController)
app.use('/itemPhoto', itemPhotoController)
app.use('/staff', staffController)
// app.use('/slider', sliderController)
app.use('/appInfo', appInfoController)
app.use('/login', loginController)
