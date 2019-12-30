import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', (req, res, next) => {
    res.status(200).json({
        status: 200,
        message: 'Data successfully fetched'
    });
});

export default indexRouter;