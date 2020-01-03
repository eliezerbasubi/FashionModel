import Helper from "../helpers/helper";
import { CREATED_CODE, BAD_REQUEST_CODE, RESOURCE_CONFLICT, UNAUTHORIZED_CODE, SUCCESS_CODE, NOT_FOUND_CODE, INTERNAL_SERVER_ERROR_CODE } from '../constants/responseCodes'
import { AUTHENTIFICATED_MSG, EMAIL_ALREADY_EXIST, OLD_PASSWORD_NOT_MATCH, RESET_SUCCESSFUL } from "../constants/feedback";
import User from '../models/db/user';
import { UNAUTHORIZED_ACCESS } from "../constants/responseMessages";

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'


dotenv.config();

export default class Auth { 
    static async signUp(req, res) {
        try {
           const doesUserExist = await User.findOne({ email: req.body.email });
            if(doesUserExist){
               return Helper.error(res, BAD_REQUEST_CODE, EMAIL_ALREADY_EXIST);
            }
           const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                isAdmin: req.body.isAdmin
            });
            const newUser = await user.save();
            newUser.isAdmin = undefined;
            Helper.success(res, CREATED_CODE, newUser, AUTHENTIFICATED_MSG);
        } catch (error) {
            Helper.error(res, RESOURCE_CONFLICT, error.message);
        }
    }

    static async signIn (req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email, password: password });
        if(user){
            const { isAdmin, userId, _id, firstname, lastname, phoneNumber, address} = user;

            const token = jwt.sign({ email, userId, isAdmin }, process.env.JWT_TOKEN, {
                expiresIn: '24h'
            });
            const userData = { token, _id, firstname, lastname, email, phoneNumber, address }
           
            Helper.success(res, SUCCESS_CODE, userData, 'Auth successful');
        }
        else{
            Helper.error(res, UNAUTHORIZED_CODE, UNAUTHORIZED_ACCESS);
        }
    }

    static async resetPassword (req, res) {
        try {
            const { _id } = res.user;
            const { new_password } = req.body;
            res.user.password = new_password;
            // const updatedData = await User.findOneAndUpdate({ _id }, { password: new_password });
            const updatedData = await res.user.save();
            updatedData.password = undefined;
            Helper.success(res, SUCCESS_CODE, updatedData, RESET_SUCCESSFUL);
        } catch (error) {
            Helper.error(res, INTERNAL_SERVER_ERROR_CODE, error.message);
        }
    }
}