const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

router.get('/', (req, res) => {
	res.render("login/index", {

	});
});

router.post('/', function(req,res){
	var staff_id = req.body.staff_id;
	var pwd = req.body.pwd;

	var data = {
		"staff_id": staff_id,
		"pwd":pwd
	}

  db.collection('Staff').findOne(data, function(err,result){
      if(err) throw err;
      if (result){
          console.log(result);
          res.render('dashboard/dashboard');
      }else{
          console.log(result);
          console.log('Login failure. Wrong account or password');
      }
  });

})

router.post('/login', function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "email": email,
        "password":password
    }

    // req.session.email = req.body.email;
    // req.session.password = req.body.password;

    db.collection('Member').findOne(data, function(err,result){
        // console.log(JSON.stringify(req.session));
        if(err) throw err;
        if (result){
            // if(!req.session.authenticated){
                res.send(result);
                console.log(result);
                // console.log(req.session.email);
                // res.render('index_login', {email});
            // }

        }else{
            console.log(result);
            console.log('Login failure. Wrong account or password');
        }
    });


});



module.exports = router;
