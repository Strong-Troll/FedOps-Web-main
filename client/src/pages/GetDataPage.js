import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const GetDataPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000'); // Replace with your server URLd

    socket.emit("get_train", (response) => {
      console.log(response); // "got it"  
    });

    socket.on('response_train', (jsonData) => {
      setData(jsonData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log(data);
  return (
    <div>
      <h1>React App</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item._id}>{item.name}</li> // Assuming the data has a 'name' field
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default GetDataPage;
