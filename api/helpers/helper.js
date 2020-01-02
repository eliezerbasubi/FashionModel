import { UNPROCESSABLE_ENTITY } from "../constants/responseCodes";

export default class Helper {
    static success (res, statusCode, data, message){
       return res.status(statusCode).json({
            status: statusCode,
            message,
            data
        });
    }

    static error (res, statusCode, error) {
        return res.status(statusCode).json({
            status: statusCode,
            error
        })
    }

    static joiError(res, error) {
        const body = {
          status: UNPROCESSABLE_ENTITY,
          error: error.message.replace(/[^a-zA-Z0-9_.: ]/g, '')
        };
        return res.status(UNPROCESSABLE_ENTITY).json(body);
      }
}