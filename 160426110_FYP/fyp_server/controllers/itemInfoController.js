const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const ItemInfo = mongoose.model('ItemInfo');

router.get('/', (req, res) => {
	res.render("itemInfo/add_edit", {
		viewTitle: "Create Item Info"
	});
});

router.post('/', (req, res) => {
	if(req.body._id =='')
	insertRecord(req, res);
    else
    updateRecord(req, res);
});

router.post("/find", (req, res) => {
	const item_id = req.body.id;
	console.log(item_id)
	ItemInfo.find({
			item_id:item_id
		},{
		_id: 0,
		__v: 0
	}, function(err, itemIDs){
		res.send(itemIDs);
		// res.render('/movie_info', {
		// 	item: items
		// });
		// res.redirect('/movie_info');
		console.log(itemIDs);
	});
	// var id = req.body.id;
	// ItemInfo.find((error, result) => {
	// 		item_id:{
	// 			$regex: new RegExp(id)
	// 		}
	// 	if(error) {
	// 		return res.status(500).send(error);
	// 	}
	// 	res.send(result);
	// 	console.log(result);
	// });
});

router.post('/add', (req, res) => {

	clientinsertRecord(req, res);

});

function clientinsertRecord(req,res){
	var itemInfo = new ItemInfo();
	itemInfo.item_id = req.body.id;
	itemInfo.address = req.body.address;
	itemInfo.address_map = req.body.address_map;
	itemInfo.price = req.body.price;
	itemInfo.save((err,doc) => {
		if(!err){}
		// res.redirect('item/list');
		else{
			console.log('Error during record insertion : ' + err);
		}
	});
}


function insertRecord(req,res){
	var itemInfo = new ItemInfo();
	itemInfo.item_id = req.body.item_id;
    itemInfo.list_id = req.body.list_id;
    itemInfo.address = req.body.address;
    itemInfo.address_map = req.body.address_map;
    itemInfo.price = req.body.price;
	itemInfo.save((err,doc) => {
		if(!err)
			res.redirect('itemInfo/list');
		else{
			console.log('Error during record insertion : ' + err);
		}
	});
}

function updateRecord(req, res) {
	ItemInfo.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('itemInfo/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("itemInfo/add_edit", {
					viewTitle: "Edit Item Info",
					itemInfo: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	ItemInfo.find((err, docs) => {
		if(!err){
			res.render("itemInfo/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving Item Info :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	ItemInfo.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("itemInfo/add_edit", {
				viewTitle: "Edit Item Info",
				itemInfo: doc
			});
		}
	});
});


module.exports = router;
