const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('_helpers/authorize')
const Role = require('_helpers/role');

// routes
router.post('/authenticate', authenticate);     // public route
router.post('/signup', signup);
module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function signup(req, res, next) {
    userService.signup(req.body)
        .then(success => success ? res.json({message: 'User saved successfully'}) : res.status(400).json({ message: 'User with this username already exists' }))
        .catch(err => next(err));
}