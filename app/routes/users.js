var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.route('/')
	.post(function(req, res) {
		var user = new User();
		user.name = req.body.name;
		user.save(function(err) {
			if (err)
				res.status(500).send(err);
			res.json({ message: 'User created!' });
		});
	})
	.get(function(req, res) {
	 	User.find(function(err, users) {
	 		if (err)
	 			res.status(500).send(err);
	 		res.status(200).json(users);
	 	});
	});
router.route('/:user_id')
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.status(500).send(err);
			res.status(200).json(user);
		});
	})
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.status(500).send(err);
			user.name = req.body.name;
			user.save(function(err) {
				if (err)
					res.status(500).send(err);
				res.status(200).json({ message: 'User updated!' });
			});
		});
	})
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.status(500).send(err);
			res.status(200).json({ message: 'Successfully deleted' });
		});
	});
module.exports = router;