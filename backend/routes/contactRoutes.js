const express = require('express');
const router = express.Router();
const { submitContactForm, getContacts } = require('../controllers/contactController');

router.post('/', submitContactForm);
router.get('/', getContacts);

module.exports = router;
