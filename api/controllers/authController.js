import Helper from "../helpers/helper";
import { CREATED_CODE } from '../constants/responseCodes'
import { AUTHENTIFICATED_MSG } from "../constants/feedback";

const userData = [];
export default class Auth { 
    static signUp(req, res) {
        userData.push(req.body);
        Helper.success(res, CREATED_CODE, userData, AUTHENTIFICATED_MSG)
    }
}