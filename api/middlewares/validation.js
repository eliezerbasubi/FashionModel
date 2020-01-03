import Joi from 'joi';
import Helper from '../helpers/helper';
import { BAD_REQUEST_CODE } from '../constants/responseCodes';
import { OLD_PASSWORD_NOT_MATCH, PASSWORD_DOESNT_MATCH, SHOULD_NOT_MATCH } from '../constants/feedback';

export default class Validator {
    static signUp(req, res, next){
        const schema = Joi.object().keys({
            firstname: Joi.string().regex(/^[aA-zZ]+$/i).min(3).max(25).required(),
            lastname: Joi.string().regex(/^[aA-zZ]+$/i).min(3).max(25).required(),
            password: Joi.string().min(6).max(15).required(),
            phoneNumber: Joi.string().regex(/^[0-9]{7,10}$/).required(),
            address: Joi.string().min(5).max(30).required(),
            isAdmin: Joi.boolean().strict().valid(true, false).optional()
        });

        const body = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            isAdmin: req.body.isAdmin,
        }

        const { error } = Joi.validate(body, schema);

        if(!error){ return next(); }
        return Helper.joiError(res, error);
    }

    static reset(req, res, next){
        const schema = Joi.object().keys({
            new_password: Joi.string().min(6).max(15).required(),
            confirm_password: Joi.string().min(6).max(15).required()
        });
        const { new_password, old_password, confirm_password } = req.body;
        const { error } = Joi.validate({ new_password, confirm_password }, schema);

        const { password } = res.user;
        
        if(password !== old_password){
            return Helper.error(res, BAD_REQUEST_CODE, OLD_PASSWORD_NOT_MATCH);
        }
        if(new_password === old_password){
            return Helper.error(res, BAD_REQUEST_CODE, SHOULD_NOT_MATCH);
        }
        if(new_password !== confirm_password){
            return Helper.error(res, BAD_REQUEST_CODE, PASSWORD_DOESNT_MATCH);
        }

        if(!error){
            return next();
        }
        return Helper.joiError(res, error);
    }
}