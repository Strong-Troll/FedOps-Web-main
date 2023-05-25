import axios from 'axios';
const taskSockets = (io) => {
  const SERVER_ST = 'http://ccljhub.gachon.ac.kr:40019';

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    const fetchData = async (_id) => {
      try {
        const response = await axios.get(`${SERVER_ST}/FLSe/GetFLTask/${_id}`);
        const data = response.data;

        // Emit the task data
        socket.emit('updateTask', data);

        // Fetch the task status
        const statusResponse = await axios.get(
          `${SERVER_ST}/FLSe/status/${_id}`,
        );
        const statusData = statusResponse.data;

        // Emit the task status
        socket.emit('updateFlServerStatus', statusData);
      } catch (error) {
        console.error(`Error fetching data from API: ${error}`);
      }
    };


    const startTask = async ({ taskId, devices, serverRepoAddr }, callback) => {
      try {
        const response = await axios.post(`${SERVER_ST}/FLSe/startTask`, {
          task_id: taskId,
          devices,
          server_repo_addr: serverRepoAddr,
        });

        console.log('Response from server:', response.data);

        if (response.data.status === 'Task started.') {
          callback({ status: 'Task started.' });
        } else if (response.data.status === 'already started') {
          callback({ status: 'Task already started.' });
        } else {
          callback({ status: 'Failed to start task.' });
        }
      } catch (error) {
        console.error(`Error starting task via API:`, error);

        if (error.response) {
          console.log('Error response from server:', error.response.data);

          callback({ status: 'Failed to start task.' });
        } else {
          callback({ status: 'Failed to start task.' });
        }
      }
    };

    socket.on('requestData', fetchData);
    socket.on('startTrain', startTask); // Add startTrain event listener

    // Make sure to clear the interval when the socket disconnects
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export default taskSockets;
