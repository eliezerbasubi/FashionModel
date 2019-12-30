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
}