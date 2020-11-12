const express 		= require('express');
const router 		= express.Router();

const path          = require('path');
const ep			= require('../utility/endpoints.utils');

/* ping */
router.get('/ping', function(req, res, next) {
  res.json({status:"success", message:"pong", data:{"version_number":"v1.0.0"}})
});


module.exports = router;