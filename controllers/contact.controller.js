const { to, sendError , sendSuccess }   = require('../services/util.service');
const logger 							= require('../services/log.service');
const {USER_LOG_DIR}					= require('../utility/logDirs.utils');
const msg								= require('../utility/messages.utils');
const sc								= require('../utility/statusCodes.utils');
const ep								= require('../utility/endpoints.utils');

const { 
    logObj
}										= require('../utility/helper.utils');

const {
    Contact,
} 										= require('../models/index');

const logDir = USER_LOG_DIR;

exports.submit = async function(req, res) {
	const r	= ep.USER_CREATE;
    const body = req.body;
    req.checkBody('eml').notEmpty().isValidEmail();
    req.checkBody('f_nm').notEmpty();
    req.checkBody('m_nm').optional();
    req.checkBody('l_nm').notEmpty();
    req.checkBody('desc').optional();
    req.checkBody('p_no').isLength({ min: 10, max:10 }).notEmpty(); // need to change this isLength

    if(req.validationErrors()){
		logger.log("error", {r : r, sc : sc.BAD_REQUEST, msg : req.validationErrors(), p : req.body}, USER_LOG_DIR);
    	return sendError(res, msg.invalid_parameters, sc.BAD_REQUEST);
    }
    let contactDTO = {
        f_nm: req.body.f_nm,
        m_nm: req.body.m_nm ? req.body.m_nm: null,
        l_nm: req.body.l_nm ? req.body.l_nm: null,
        p_no: req.body.p_no ? req.body.p_no: null,
        desc: req.body.desc ? req.body.desc: null,
        eml: req.body.eml ? req.body.eml: null,
        act: true,
    }
    newContact = new Contact(contactDTO);
    [err, newContact] = await to(newContact.save());
    if(err) {
        logger.log("error", {r : r, sc : sc.UNPROCESSABLE_ENTITY, msg : err, p : req.body}, USER_LOG_DIR);
        return sendError(res, err, sc.UNPROCESSABLE_ENTITY);
    }

    return sendSuccess(res, { success:true });

}

exports.deleteContact = async function(req, res) {
	const r	= ep.USER_CREATE;
    const body = req.body;
    console.log("called");
    req.checkBody('ct_id').notEmpty();
    
    if(req.validationErrors()){
		logger.log("error", {r : r, sc : sc.BAD_REQUEST, msg : req.validationErrors(), p : req.body}, USER_LOG_DIR);
    	return sendError(res, msg.invalid_parameters, sc.BAD_REQUEST);
    }
    let ct_id = req.body.ct_id;

    let updateObj = {
        act : false,
    };

    let contact;
    [err, contact] = await to(Contact.findOneAndUpdate({
        _id : ct_id,
    }, {
        $set : updateObj
    }));

    if(err) {
        logger.log("error", logObj(r, sc.UNPROCESSABLE_ENTITY, err, req.body), logDir);
        return sendError(res, err, sc.UNPROCESSABLE_ENTITY);
    }

    if(!contact) {
        logger.log("error", logObj(r, sc.UNPROCESSABLE_ENTITY, "product_" + msg.updating_error, req.body), logDir);
        return sendError(res,  msg.updating_error, sc.UNPROCESSABLE_ENTITY);
    }

    logger.log("info", logObj(r, sc.SUCCESS, "product_"+msg.updated), logDir);
    return sendSuccess(res, { data : contact });
}

exports.getAllContacts = async function(req, res) {
    let contacts;
    [err, contacts] = await to(Contact.find({act : true}, {_id : 1, p_no : 1, f_nm : 1, l_nm : 1, m_nm:1, eml:1}));
    if(err) {
        logger.log("error", logObj(r, sc.UNPROCESSABLE_ENTITY,err, req.body), USER_LOG_DIR);
        return sendError(res, err, sc.UNPROCESSABLE_ENTITY);
    }

    return sendSuccess(res, { data:contacts });    
}


