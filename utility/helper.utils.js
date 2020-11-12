const mongoose = require('mongoose');

exports.print  = function(o) {
	return JSON.stringify(o, {}, 2);
}

exports.logObj = function(r="", sc="", msg, data={}) {
	return { r, sc, msg, data };
}

exports.validMongoId = (id) => mongoose.Types.ObjectId.isValid(id);