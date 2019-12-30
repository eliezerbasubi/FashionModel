import express from 'express';
import indexRouter from './routes/index';

const app = express();

app.use(express.json());
app.use(indexRouter);

app.use((req, res, next) => {
    res.send('Welcome to fashion model API')
})

export default app;