import axios from 'axios';
import mongoose from 'mongoose';

const { MongoClient } = require('mongodb');

const trainSockets = (io, MONGO_URI) => {

  io.on('connection', (socket) => {
    socket.on('get_train', async () => {
      try {
        // Connect to MongoDB
        const client = await mongoose.connect(MONGO_URI);
        const collection = client.connection.collection('fl.client_train_result_log');
  
        // Execute query and retrieve data
        const data = await collection.find().toArray();
  
        // Send data back to client
        socket.emit('response_train', data);
  
        // Close MongoDB connection
        client.disconnect();
      } catch (error) {
        console.error('Error retrieving data from MongoDB:', error);
      }
    });
  });
};

export default trainSockets;
