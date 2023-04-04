const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const ItemInfo = mongoose.model('ItemInfo');
const ItemPhoto = mongoose.model('ItemPhoto');

router.get('/', (req, res) => {
	res.render("item/add_edit", {
		viewTitle: "Create Item"
	});
});

router.post('/', (req, res) => {
	if(req.body._id =='')
	insertRecord(req, res);
    else
    updateRecord(req, res);
});

router.get("/find", (request, response) => {
	Item.find((error, result) => {
		if(error) {
			return response.status(500).send(error);
		}
		response.send(result);
	});
});

router.post("/searching", (req, res) => {
	var keyword = req.body.search;
	console.log(keyword)
	Item.find({ $or:[
			{item_name:{
					$regex: new RegExp(keyword)
				}},
			{item_info:{
					$regex: new RegExp(keyword)
				}},
			{item_type:{
					$regex: new RegExp(keyword)
				}}
		]},{
		_id: 0,
		__v: 0
	}, function(err, items){
		for (let i in items){
			ItemPhoto.findOne(
				{
					item_id: items[i].item_id
				}
				,{
					_id: 0,
					__v:0
				}, function(err, itemPhotos){
					// res.send(itemPhotos);
					console.log(itemPhotos.photo)
					console.log(itemPhotos)
					items.photo = itemPhotos.photo
					console.log(items.photo)
				})
		}
		res.send(items);
		// res.render('/movie_info', {
		// 	item: items
		// });
		// res.redirect('/movie_info');

		console.log(items);
	});
});

// router.post("/photo", (req, res) => {
// 	var keyword = req.body.search;
// 	console.log(keyword)
// 			ItemPhoto.findOne(
// 				{
// 					item_id: items[i].item_id
// 				}
// 				,{
// 					_id: 0,
// 					__v:0
// 				}, function(err, itemPhotos){
// 					// res.send(itemPhotos);
// 					console.log(itemPhotos)
// 					res.send(itemPhotos);
// 				})
//
// 		// res.render('/movie_info', {
// 		// 	item: items
// 		// });
// 		// res.redirect('/movie_info');
//
// });

router.post("/type", (req, res) => {
	var keyword = req.body.search;
	console.log(keyword)
	Item.find(
			{item_type:{
					$regex: new RegExp(keyword)
				}
		},{
		_id: 0,
		__v: 0
	}, function(err, items){
		for (let i in items){
			ItemPhoto.findOne(
				{
					item_id: items[i].item_id
				}
				,{
					_id: 0,
					__v:0
				}, function(err, itemPhotos){
					// res.send(itemPhotos);
					console.log(itemPhotos.photo)
					console.log(itemPhotos)
					items.photo = itemPhotos.photo
					console.log(items.photo)
				})
		}
		res.send(items);
		// res.render('/movie_info', {
		// 	item: items
		// });
		// res.redirect('/movie_info');

		console.log(items);
	});
});

router.post("/name", (req, res) => {
	var item_name = req.body.item_name;
	console.log(item_name)
	Item.findOne({
			item_name:{
					$regex: new RegExp(item_name)
				}
		},{
		_id: 0,
		__v: 0
	}, function(err, item_names){
		res.send(item_names);
		// res.render('/movie_info', {
		// 	item: items
		// });
		// res.redirect('/movie_info');
		console.log(item_names);
	});
});

function insertRecord(req,res){
	var item = new Item();
	item.item_id = req.body.item_id;
	item.item_name = req.body.item_name;
	item.item_type = req.body.item_type;
	item.item_info = req.body.item_info;
	item.save((err,doc) => {
		if(!err)
			res.redirect('item/list');
		else{
			console.log('Error during record insertion : ' + err);
		}
	});
	var itemInfo = new ItemInfo();
    	itemInfo.item_id = req.body.item_id;
    	itemInfo.list_id = req.body.reward_id;
    	itemInfo.address = req.body.address;
    	itemInfo.address_map = req.body.address_map;
    	itemInfo.price = req.body.price;
    	itemInfo.save((err,doc) => {
    	});

    var itemPhoto = new ItemPhoto();
        	itemPhoto.item_id = req.body.item_id;
        	itemPhoto.photo_id = req.body.photo_id;
        	itemPhoto.photo = req.body.photo;
        	itemPhoto.save((err,doc) => {
        	});
}

function updateRecord(req, res) {
	Item.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('item/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("item/add_edit", {
					viewTitle: "Edit Item",
					item: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	Item.find((err, docs) => {
		if(!err){
			res.render("item/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving item list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	Item.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("item/add_edit", {
				viewTitle: "Edit Item",
				item: doc
			});
		}
	});
});

module.exports = router;
