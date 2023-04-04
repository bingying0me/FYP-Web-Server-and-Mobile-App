const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Member = mongoose.model('Member');


// router.get('/', (req, res) => {
// 	res.render("member/add", {
// 		viewTitle: "Create Member"
// 	});
// });

router.post('/', (req, res) => {
    updateRecord(req, res);
});

router.post('/signup', (req, res) => {

	insertRecord(req, res);

});

function insertRecord(req,res){
	var member = new Member();
	member.member_id = " ";
	member.firstname = req.body.firstname;
	member.lastname = req.body.lastname;
	member.gender = req.body.gender;
	member.birthdate = req.body.birthdate;
	member.phone = req.body.phone;
	member.email = req.body.email;
	member.password = req.body.password;
	member.save((err,doc) => {
		if(!err){}
			// res.redirect('item/list');
		else{
			console.log('Error during record insertion : ' + err);
		}
	});
}

function updateRecord(req, res) {
	Member.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('member/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("member/edit", {
					viewTitle: "Edit Member",
					member: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	Member.find((err, docs) => {
		if(!err){
			res.render("member/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving member list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	Member.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("member/edit", {
				viewTitle: "Edit Member",
				member: doc
			});
		}
	});
});

module.exports = router;
