require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

// Import necessary modules for Socket.IO
import http from 'http';
import { Server } from 'socket.io';
import taskSockets from './sockets/taskSockets';

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // createFakeData();
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// Create an HTTP server and attach the Koa app to it
const server = http.createServer(app.callback());

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Your client's origin
    methods: ['GET', 'POST'], // Allowed methods
    allowedHeaders: ['my-custom-header'], // Allowed headers
    credentials: true,
  },
});

taskSockets(io); // Pass the Socket.IO server to the taskSockets module


io.on('connection', (socket) => {
  socket.on('get_train', async (_id) => {
    console.log('get train message');
    try {
      // Connect to MongoDB
      const client = await mongoose.connect(MONGO_URI);
      const collection = client.connection.collection('fl-client_train_result_log');

      // Execute query and retrieve data
      const data = await collection.find({ _id: { $exists: true } }).toArray();
      
      // Send data back to client
      socket.emit('response_train', data);

      // Close MongoDB connection
      client.disconnect();
    } catch (error) {
      console.error('Error retrieving data from MongoDB:', error);
    }
  });
});
export default server;

// PORT가 지정되어 있지 않다면 4000을 사용
const port = PORT || 4000;

// Use the HTTP server to listen instead of the Koa app
server.listen(port, () => {
  console.log('Listening to port %d', port);
});