import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './api/index';

dotenv.config();

const PORT = 5000 || process.env.PORT;

const server = http.createServer(app);

mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true, useUnifiedTopology: true, 
  useCreateIndex: true, useFindAndModify: false
 });

mongoose.connection.once('open', () => console.log('Database Connection established')
).on('error', (error) => console.error(error));

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});

export default server;