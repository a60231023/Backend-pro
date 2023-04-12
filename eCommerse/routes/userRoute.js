const express = require('express');
const router = express.Router();

const {signup} = require('../controllers/userController');


router.get('/signup', signup);

module.exports = router;