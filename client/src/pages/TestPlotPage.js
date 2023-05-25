import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import { Typography, Grid } from '@mui/material';
import Header from '../components/common/Header';
import ContentWrapper from '../components/common/ContentWrapper';
import NavTabs from '../components/task/NavTabs';
import { Line } from 'react-chartjs-2';
import ShowPlotButton from '../components/graph/ShowPlotButton';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);


function PlotPage() {
  const { _id } = useParams();
  // const [chartArray, setchartArray] = useState({})
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState({})
  const [jsonData, setData] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3000'); // Replace with your server URLd

    try {
      socket.emit("get_train", _id, (response) => {
        console.log(response); // "got it"  
      });

      socket.on('response_train', (jsonData) => {
        setData(jsonData);
        console.log(jsonData);
      });

    } catch (error) {
      console.error('Error retrieving data from MongoDB:', error);
    }

    const filteredData = jsonData.filter(jsonData => jsonData.fl_task_id === _id);

    // Extract relevant data for the chart
    const rounds = filteredData.map(data => data.round);
    const trainLoss = filteredData.map(data => data.test_loss);
    const trainAcc = filteredData.map(data => data.test_acc);
    const data = {
      labels: rounds,
      datasets: [
        {
          label: 'Test Loss',
          data: trainLoss,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          fill: true,
        },
        {
          label: 'Test Accuracy',
          data: trainAcc,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          fill: true,
        },
      ],
    };

    setChartOptions({
      responsive: true,
      plugins: {
          lelgend: {
          position: 'top'
          },
          title: {
          display: true,
          text: "Test Result"
          }
      },
      interaction: {
          mode: "index",
          intersect: false,
      }
      })

    setChartData(data);

    const handleBeforeUnload = () => {
      // Optionally, you can add some additional logic before closing the socket
      // For example, sending a farewell message to the server
  
      // Close the socket connection
      socket.close();
      socket = io('http://localhost:3000');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove the event listener
    return () => {
      // Close the socket connection
      socket.close();
      // Remove the event listener
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [jsonData, _id]);

  const handleShowTrainResult = () => {
    // Logic to show the train result
    console.log('Show train result');
  };

  return (
    <div>
      <Header />
      <ContentWrapper>
        <Typography variant="h5">
          TaskID : {_id}
        </Typography>
        <NavTabs _id = {_id}/>
        <Grid container spacing={1}>
        {chartData && (
        <Line
          data={chartData}
          options={chartOptions}
        />
      )}
        </Grid>
      </ContentWrapper>
    </div>
  )
}
export default PlotPage;