var fs = require('fs');

var configs = {
    'CONFIGS_OVERWRITE_FILE'                : 'config_overwrite.js',
    'SECRET'						        : 'foo@bar' ,
    'MONGO_HOST' 					        : ['127.0.0.1'] ,
    'MONGO_PORT' 					        : '27017' ,
    'MONGO_USER'                            : '',
    'MONGO_PASSWORD'                        : '',
    'MONGO_SERVER_KEEPALIVE'                : 120,
    'MONGO_REPLICA_SET_NAME'                : '',
    'MONGO_REPLICA_KEEPALIVE'               : 120,
    'MONGO_LOWER_POOLSIZE'                  : 5,
    'MONGO_LOWER_POOLSIZE'                  : 5,
    'DB_NAME'		 				        : 'comfortech',
};

var overwriteConfigFulFileName = __dirname + '/' + configs.CONFIGS_OVERWRITE_FILE;

if (fs.existsSync(overwriteConfigFulFileName)) {
    var overwriteConfig = require(overwriteConfigFulFileName);
    for (var key in overwriteConfig) {
        configs[key] = overwriteConfig[key];
    }
} else {
    console.log('[[[[[[[ No Overwrite Configs File Found to overwrite any config key ]]]]]]]]');
}

module.exports = configs;