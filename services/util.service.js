const {to} = require('await-to-js');

module.exports.to = async (promise) => {
    let err, res;
    [err, res] = await to(promise);
    if(err) return [err];

    return [null, res];
};

module.exports.sendError = function(res, err, code){ // Error Web Response
    let send_data = {success:false};
    if(typeof err == 'object' && typeof err.message != 'undefined'){
        err = err.message;
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    send_data.error = err;

    return res.json(send_data);
};

module.exports.sendSuccess = function(res, data, code){ // Success Web Response
    let send_data = {success:true};

    if(typeof data == 'object'){
        send_data = Object.assign(data, send_data);//merge the objects
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
};

module.exports.TE = function(err){ // throwError
    return err
}
