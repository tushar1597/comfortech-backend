const mongoose 			= require('mongoose');
const bcrypt 			= require('bcryptjs');
const jwt           	= require('jsonwebtoken');
const validate          = require('mongoose-validator');
const {TE , to}         = require('../services/util.service');
const CONFIG            = require('../configs/configs');

let ContactSchema = mongoose.Schema({
    f_nm        :   {   type : String, trim: true, required : true } ,           // first name
    l_nm        :   {   type : String, trim: true, required : false } ,          // last name
    m_nm        :   {   type : String, trim: true, required : false } ,
    p_no           :	{   type : String, lowercase:true, required : true,                           // mobile number
                        validate:[validate({
                            validator: 'isNumeric',
                            arguments: [7, 20],
                            message: 'Not a valid phone number.',
                        })]
                    },
    eml           :   {   type:String, lowercase:true , required : true, trim: true, // email id
                        validate:[validate({
                            validator: 'isEmail',
                            message: 'Not a valid email.',
                        })]
                    },
    desc           :  {   type : String, trim: true, required : false } ,    
    act         :   { type : Boolean , required : true , default : true},            // active
   
    
}, {timestamps: true});


ContactSchema.statics = {
	TYPE : {
		SUPERADMIN      	: 1,
		ADMIN           	: 2,
		USER            	: 3
	}
};


// ContactSchema.index({p_no:1}, {unique:true});

let Contact = module.exports = mongoose.model('Contact', ContactSchema);