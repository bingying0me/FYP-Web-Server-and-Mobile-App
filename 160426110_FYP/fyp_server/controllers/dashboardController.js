const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

router.use(express.static(__dirname));

router.get('/', (req, res) => {
	res.render("./dashboard/dashboard", {

	});
});

router.post('/', (req, res) => {

});


module.exports = router;
