const express 		= require('express');
const router 		= express.Router();

const {
	contactCtrl,
} = require('../controllers/index');

const ep			= require('../utility/endpoints.utils');

/* Contact */
router.post(ep.SUBMIT_CONTACT_FORM, contactCtrl.submit);
router.post(ep.DELETE_CONTACT, contactCtrl.deleteContact);
router.get(ep.GET_ALL_CONTACTS, contactCtrl.getAllContacts);

module.exports = router;