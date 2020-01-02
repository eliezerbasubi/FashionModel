import Helper from "../helpers/helper";
import { CREATED_CODE, BAD_REQUEST_CODE, RESOURCE_CONFLICT } from '../constants/responseCodes'
import { AUTHENTIFICATED_MSG, EMAIL_ALREADY_EXIST } from "../constants/feedback";
import User from '../models/db/user';

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
}