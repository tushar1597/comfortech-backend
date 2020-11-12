//----------------------------------Winston config file--------------------------------//
const {createLogger, format, transports} 	= require('winston');
const DailyRotate 							= require('winston-daily-rotate-file');
const bv      								= require('bvalid');
const chalk 								= require('chalk');
const logDir 								= require('../utility/logDirs.utils');
const logpath								= logDir.APPLICATION_LOG_DIR;

const getFileName = (dir)=>{
	var _f = logpath;
	if(bv.isString(dir)){
		_f += dir + '/';
	}else{
		_f += 'application/'
	}
	return _f+"/";
}

var debug = (dir)=>{
	var _fn = getFileName(dir);
	return createLogger({
		format: format.combine(
			format.colorize(),
			format.timestamp({
				format: 'YYYY-MM-DD HH:mm:ss',
			}),
			format.printf(
				debug => `[${chalk.blue(debug.timestamp)}] [${debug.level}] : ${JSON.stringify(debug.message, {}, 2)}`
			),
		),
		transports: [
			new (transports.Console)({
				levels: 'debug',
				format: format.combine(
					format.colorize(),
					format.printf(
						debug => `[${chalk.blue(debug.timestamp)}] [${debug.level}] : ${JSON.stringify(debug.message, {}, 2)}`
					),
				),
			}),
			new (DailyRotate)({
				filename: `${_fn}%DATE%.log`,
				datePattern: 'YYYY-MM-DD',
			}),
		],
		exitOnError: false
	});
}

var info = (dir)=>{
	var _fn = getFileName(dir);
	return createLogger({
		format: format.combine(
			format.colorize(),
			format.timestamp({
				format: 'YYYY-MM-DD HH:mm:ss',
			}),
			format.printf(
				info => `[${chalk.blue(info.timestamp)}] [${info.level}] : ${JSON.stringify(info.message, {}, 2)}`
			),
		),
		transports: [
			new (transports.Console)({
				levels: 'info',
				format: format.combine(
					format.colorize(),
					format.printf(
						info => `[${chalk.blue(info.timestamp)}] [${info.level}] : ${JSON.stringify(info.message, {}, 2)}`
					),
				),
			}),
			new (DailyRotate)({
				filename: `${_fn}%DATE%.log`,
				datePattern: 'YYYY-MM-DD',
			}),
		],
		exitOnError: false
	});
}

var warn = (dir)=>{
	var _fn = getFileName(dir);
	return createLogger({
		format: format.combine(
			format.colorize(),
			format.timestamp({
				format: 'YYYY-MM-DD HH:mm:ss',
			}),
			format.printf(
				warn => `[${chalk.blue(warn.timestamp)}] [${warn.level}] : ${JSON.stringify(warn.message, {}, 2)}`
			),
		),
		transports: [
			new (transports.Console)({
				levels: 'warn',
				format: format.combine(
					format.colorize(),
					format.printf(
						warn => `[${chalk.blue(warn.timestamp)}] [${warn.level}] : ${JSON.stringify(warn.message, {}, 2)}`
					),
				),
			}),
			new (DailyRotate)({
				filename: `${_fn}%DATE%.log`,
				datePattern: 'YYYY-MM-DD',
			}),
		],
		exitOnError: false
	});
}

var error = (dir)=>{
	var _fn = getFileName(dir);
	return createLogger({
		format: format.combine(
			format.colorize(),
			format.timestamp({
				format: 'YYYY-MM-DD HH:mm:ss',
			}),
			format.printf(
				error => `[${chalk.blue(error.timestamp)}] [${error.level}] : ${JSON.stringify(error.message, {}, 2)}`
			),
			// format.json()
		),
		transports: [
			new (transports.Console)({
				levels: 'error',
				format: format.combine(
					format.colorize(),
					format.printf(
						error => `[${chalk.blue(error.timestamp)}] [${error.level}] : ${JSON.stringify(error.message, {}, 2)}`
					)
				),
			}),
			new (DailyRotate)({
				filename: `${_fn}%DATE%.log`,
				datePattern: 'YYYY-MM-DD',
			}),
		],
		exitOnError: false,
	});
}

var exports = {
	debug: function(msg,dir){
		debug(dir).debug(msg);
	},
	info: function(msg,dir){
		info(dir).info(msg);
	},
	warn: function(msg,dir){
		warn(dir).warn(msg);
	},
	error: function(msg,dir){
		error(dir).error(msg);
	},
	log: function(level,msg,dir){
		var lvl = exports[level];
		lvl(msg,dir);
	}
};

module.exports = exports;