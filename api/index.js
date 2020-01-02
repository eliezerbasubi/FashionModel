import express from 'express';
import indexRouter from './routes/index';
import { METHOD_NOT_FOUND } from './constants/responseCodes';
import { METHOD_NOT_FOUND_MSG } from './constants/responseMessages';

const app = express();

app.use(express.json());
app.use(indexRouter);

app.use((req, res, next) => {
    res.status(METHOD_NOT_FOUND).json({
        status: METHOD_NOT_FOUND,
        message: METHOD_NOT_FOUND_MSG
    });
})

export default app;