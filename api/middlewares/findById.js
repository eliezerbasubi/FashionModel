import User from "../models/db/user";
import Helper from "../helpers/helper";
import { NOT_FOUND_CODE } from "../constants/responseCodes";
import { USER_ID_NOT_FOUND } from "../constants/feedback";
export default class findById {
    static async user(req, res, next) {
        let _user;

        try {
            _user = await User.findById(req.params.user_id);
                
            res.user = _user;
            next();
        } catch (error) {
            Helper.error(res, NOT_FOUND_CODE, USER_ID_NOT_FOUND);
        }
    }
}