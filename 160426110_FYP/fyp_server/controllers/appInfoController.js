const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const AppInfo = mongoose.model('AppInfo');

router.post('/', (req, res) => {
    updateRecord(req, res);
});

router.get('/appInfo', (req,res) => {
	AppInfo.find((error, result) => {
		if(error) {
			return res.status(500).send(error);
		}
		res.send(result);
		console.log(result);
	});
});

function updateRecord(req, res) {
	AppInfo.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('appInfo/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("appInfo/edit", {
					viewTitle: "Edit AppInfo",
					appInfo: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	AppInfo.find((err, docs) => {
		if(!err){
			res.render("appInfo/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving app Info list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	AppInfo.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("appInfo/edit", {
				viewTitle: "Edit AppInfo",
				appInfo: doc
			});
		}
	});
});

module.exports = router;
