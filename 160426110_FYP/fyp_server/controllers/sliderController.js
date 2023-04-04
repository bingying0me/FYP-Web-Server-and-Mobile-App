const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Slider = mongoose.model('Slider');

router.post('/', (req, res) => {
    updateRecord(req, res);
});

function updateRecord(req, res) {
	Slider.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('slider/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("slider/edit", {
					viewTitle: "Edit Slider",
					slider: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	Slider.find((err, docs) => {
		if(!err){
			res.render("slider/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving slider list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	Slider.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("slider/edit", {
				viewTitle: "Edit Slider",
				slider: doc
			});
		}
	});
});

module.exports = router;
