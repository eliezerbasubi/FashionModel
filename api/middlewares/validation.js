import Joi from 'joi';
import Helper from '../helpers/helper';
import { BAD_REQUEST_CODE } from '../constants/responseCodes';

export default class Validator {
    static signUp(req, res, next){
        const schema = Joi.object().keys({
            firstname: Joi.string().regex(/^[aA-zZ]+$/i).min(3).max(25).required(),
            lastname: Joi.string().regex(/^[aA-zZ]+$/i).min(3).max(25).required(),
            password: Joi.string().min(6).max(10).required(),
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
}