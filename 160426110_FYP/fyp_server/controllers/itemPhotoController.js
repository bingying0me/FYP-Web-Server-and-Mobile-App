const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const ItemPhoto = mongoose.model('ItemPhoto');

router.get('/', (req, res) => {
	res.render("itemPhoto/add_edit", {
		viewTitle: "Create Item Photo"
	});
});

router.post('/', (req, res) => {
	if(req.body._id =='')
	insertRecord(req, res);
    else
    updateRecord(req, res);
});


function insertRecord(req,res){
	var itemPhoto = new ItemPhoto();
	itemPhoto.item_id = req.body.item_id;
    itemPhoto.photo_id = req.body.photo_id;
    itemPhoto.photo = req.body.photo;
	itemPhoto.save((err,doc) => {
		if(!err)
			res.redirect('itemPhoto/list');
		else{
			console.log('Error during record insertion : ' + err);
		}
	});
}

function updateRecord(req, res) {
	ItemPhoto.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('itemPhoto/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("itemPhoto/add_edit", {
					viewTitle: "Edit Item Photo",
					itemPhoto: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	ItemPhoto.find((err, docs) => {
		if(!err){
			res.render("itemPhoto/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving Item Photo :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	ItemPhoto.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("itemPhoto/add_edit", {
				viewTitle: "Edit Item Photo",
				itemPhoto: doc
			});
		}
	});
});

module.exports = router;
