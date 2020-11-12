var jwt    							= require('jsonwebtoken');
var crypto 							= require('crypto');

var configs					        = require('../../configs/configs');
// var AppClients					= require('./../app_clients.js');

exports.getAT = function(object_for_token){
	var expiryTime = configs.JWT_ACCESS_TOKEN_EXPIRY_TIME;
	object_for_token.hcode = randomNumberOfLength(configs.RANDOM_NUMBER_LENGTH);
	return jwt.sign(
		object_for_token, 
		configs.JWT_ACCESS_TOKEN_PRIVATE_KEY, 
		{
	  	expiresIn: expiryTime
		}
	);
};

exports.getST = function(object_for_token){
	var expiryTime = configs.JWT_SELLER_TOKEN_EXPIRY_TIME;
	object_for_token.hcode = randomNumberOfLength(configs.RANDOM_NUMBER_LENGTH);
	return jwt.sign(
		object_for_token, 
		configs.JWT_SELLER_TOKEN_PRIVATE_KEY, 
		{
	  	expiresIn: expiryTime
		}
	);
};

exports.getRT = function(object_for_token, client){
	var expiryTime = configs.JWT_REFRESH_TOKEN_EXPIRY_TIME;
	switch (client) {
		case AppClients.MOBILE:
			expiryTime = configs.JWT_REFRESH_TOKEN_EXPIRY_TIME;
			break;
		case AppClients.ANDROID:
			expiryTime = configs.JWT_REFRESH_TOKEN_EXPIRY_TIME_ANDROID;
			break;
		case AppClients.IOS:
			expiryTime = configs.JWT_REFRESH_TOKEN_EXPIRY_TIME_IOS;
			break;
		case AppClients.WINDOWS:
			expiryTime = configs.JWT_REFRESH_TOKEN_EXPIRY_TIME;
			break;
		case AppClients.WEB:
			expiryTime = configs.JWT_REFRESH_TOKEN_EXPIRY_TIME_WEB;
			break;
	}
	object_for_token.hcode = randomNumberOfLength(configs.RANDOM_NUMBER_LENGTH);
	return jwt.sign(
		object_for_token, 
		configs.JWT_REFRESH_TOKEN_PRIVATE_KEY, 
		{
	  	expiresIn: expiryTime
		}
	);
};

exports.getOpsVT = function(object_for_token){
	var expiryTime = configs.OPS_PANEL_REQUEST_TOKEN_EXPIRY_TIME;
	var hcode      = randomNumberOfLength(configs.RANDOM_NUMBER_LENGTH);
	return jwt.sign(
		object_for_token, 
		configs.OPS_PANEL_REQUEST_TOKEN_PRIVATE_KEY, 
		{
	  	expiresIn: expiryTime
		}
	);
};

exports.getOpsAT = function(object_for_token){
	var expiryTime = configs.OPS_PANEL_ACCESS_TOKEN_EXPIRY_TIME;
	var hcode      = randomNumberOfLength(configs.RANDOM_NUMBER_LENGTH);
	return jwt.sign(
		object_for_token, 
		configs.OPS_PANEL_ACCESS_TOKEN_PRIVATE_KEY, 
		{
	  	expiresIn: expiryTime
		}
	);
};

exports.getSecret = function (device_id, client){
	var salt           = configs.JWT_TOKEN_SECRET_KEY_HASH_SALT;
	var random_num     = randomNumberOfLength(configs.RANDOM_NUMBER_LENGTH);    
	var modifiedKey    = device_id+client+salt+random_num;  
	var hashedKeyHex   = crypto.createHash('sha512').update(modifiedKey).digest('hex');
	return hashedKeyHex;
};

exports.getUserQueueAT = function(object_for_token, client){
	object_for_token.hcode = randomNumberOfLength(configs.RANDOM_NUMBER_LENGTH);
	return jwt.sign(
		object_for_token, 
		configs.JWT_USERQUEUE_TOKEN_PRIVATE_KEY, 
		{
	  	expiresIn: configs.JWT_USERQUEUE_TOKEN_EXPIRY_TIME
		}
	);
};

exports.ifRtExpForUser = function(r_token, aid, cb){
	jwt.verify(r_token, configs.JWT_REFRESH_TOKEN_PRIVATE_KEY, function(err, rt_decoded){
		if(err){
			if(err.name == "TokenExpiredError"){
				if(jwt.decode(r_token).id == aid){
					return cb(null,true);
				} else {
					return cb("refresh_token_is_not_for_user",null);
				}
			} else {
				return cb(err,null);
			}
		} else {
			return cb("refresh_token_not_expired_for_user",null);
		}
	});
};

exports.ifAtExpForUser = function(a_token, aid, cb){
	jwt.verify(a_token, configs.JWT_ACCESS_TOKEN_PRIVATE_KEY, function(err, at_decoded){
		if(err){
			if(err.name == "TokenExpiredError"){
				if(jwt.decode(a_token).id == aid){
					return cb(null,true);
				} else {
					return cb("access_token_is_not_for_user",null);
				}
			} else {
				return cb(err,null);
			}
		} else {
			return cb("access_token_not_expired_for_user",null);
		}
	});
};

exports.getExpAT = function(object_for_token, client){
	var expiryTime = 1;
	object_for_token.hcode = randomNumberOfLength(configs.RANDOM_NUMBER_LENGTH);
	return jwt.sign(
		object_for_token, 
		configs.JWT_ACCESS_TOKEN_PRIVATE_KEY, 
		{
	  	expiresIn: expiryTime
		}
	);
};

exports.ifAtBelongsToUser = function(a_token, aid, cb){
	jwt.verify(a_token, configs.JWT_ACCESS_TOKEN_PRIVATE_KEY, function(err, at_decoded){
		if(err){
			if(err.name == "TokenExpiredError"){
				if(jwt.decode(a_token).id == aid){
					return cb(null,true);
				} else {
					return cb("access_token_is_not_for_user",null);
				}
			} 
		} else if(at_decoded.id == aid){
			return cb(null,true);
		} else {
			return cb("access_token_is_not_for_user",null);
		}
	});
};

exports.ifRtBelongsToUser = function(r_token, aid, cb){
	jwt.verify(r_token, configs.JWT_REFRESH_TOKEN_PRIVATE_KEY, function(err, rt_decoded){
		if(err){
			if(err.name == "TokenExpiredError"){
				if(jwt.decode(r_token).id == aid){
					return cb(null,true);
				} else {
					return cb("refresh_token_is_not_for_user",null);
				}
			} 
		} else if(rt_decoded.id == aid){
			return cb(null,true);
		} else {
			return cb("refresh_token_is_not_for_user",null);
		}
	});
};

exports.getPromoAT = function(aid, name, pid, clv, tim){
	var object_for_token = {
		a_id : aid,
		p_id : pid,
		n_am : name,
		cl_v : clv,
		tim  : tim
	};
	var new_token =  jwt.sign(
		object_for_token, 
		configs.JWT_PROMO_ACCESS_TOKEN_PRIVATE_KEY, 
		{
	  	expiresIn: configs.JWT_PROMO_ACCESS_TOKEN_EXPIRY_TIME
		}
	);
	return new_token;
};

exports.getOAuthAT = function(client_id, client_secret){
	var object_for_token = {
		cl_id		: client_id,
		cl_secret	: client_secret,
		tim  		: new Date().getTime()
	};
	var new_token =  jwt.sign(
		object_for_token, 
		configs.JWT_OAUTH_TOKEN_PRIVATE_KEY, 
		{
	  	expiresIn: configs.JWT_OAUTH_TOKEN_EXPIRY_TIME
		}
	);
	return new_token;
};

function getMonitorAT(pid, gid, mid, ipp, tim){
	var object_for_token = {
		p_id : pid,
		g_id : gid,
		m_id : mid,
		ipp  : 20,
		tim  : tim
	};
	var new_token =  jwt.sign(
		object_for_token, 
		configs.JWT_MONITOR_ACCESS_TOKEN_PRIVATE_KEY, 
		{
	  	expiresIn: configs.JWT_MONITOR_ACCESS_TOKEN_EXPIRY_TIME
		}
	);
	return console.log(new_token);
}

function randomNumberOfLength(length) {
  return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}