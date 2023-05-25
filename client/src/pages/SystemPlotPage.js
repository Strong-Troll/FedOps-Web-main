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
    const [netData, setnetData] = useState(null);
    const [diskData, setdiskData] = useState(null);
    const [memMBData, setmemMBData] = useState(null);
    const [cpuUtilData, setcpuUtilData] = useState(null);
    const [cpuThreadData, setcpuThreadData] = useState(null);
    const [memUtilData, setmemUtilData] = useState(null);
    const [memPerData, setmemPerData] = useState(null);
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

        const filteredData = jsonData.filter(data => data.fl_task_id === _id);

        // Extract relevant data for the chart
        const network_sent = filteredData.map(data => data.network_sent);
        const network_recv = filteredData.map(data => data.network_recv);
        const disk_utilization = filteredData.map(data => data.disk_utilization);
        const runtime = filteredData.map(data => data.runtime);
        const memory_rssMB = filteredData.map(data => data.memory_rssMB);
        const memory_availableMB = filteredData.map(data => data.memory_availableMB);
        const cpu_utilization = filteredData.map(data => data.cpu_utilization);
        const cpu_threads = filteredData.map(data => data.cpu_threads);
        const memory_utilization = filteredData.map(data => data.memory_utilization);
        const memory_percent = filteredData.map(data => data.memory_percent);

        const netData = {
            labels: runtime,
            datasets: [
                {
                    label: 'network_sent',
                    data: network_sent,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    fill: true,
                },
                {
                    label: 'network_recv',
                    data: network_recv,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    fill: true,
                },
            ],
        };

        const diskData = {
            labels: runtime,
            datasets: [
                {
                    label: 'disk_utilization',
                    data: disk_utilization,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    fill: true,
                },
            ],
        };

        const memMBData = {
            labels: runtime,
            datasets: [
                {
                    label: 'memory_rssMB',
                    data: memory_rssMB,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    fill: true,
                },
                {
                    label: 'memory_availableMB',
                    data: memory_availableMB,
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    fill: true,
                },
            ],
        };

        const cpuUtilData = {
            labels: runtime,
            datasets: [
                {
                    label: 'cpu_utilization',
                    data: cpu_utilization,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    fill: true,
                },
            ],
        };

        const cpuThreadData = {
            labels: runtime,
            datasets: [
                {
                    label: 'cpu_threads',
                    data: cpu_threads,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    fill: true,
                },
            ],
        };

        const memUtilData = {
            labels: runtime,
            datasets: [
                {
                    label: 'memory_utilization',
                    data: memory_utilization,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
                    fill: true,
                },
            ],
        };

        const memPerData = {
            labels: runtime,
            datasets: [
                {
                    label: 'memory_percent',
                    data: memory_percent,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.2)',
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
                }
            },
            interaction: {
                mode: "index",
                intersect: false,
            }
        })

        setnetData(netData);
        setdiskData(diskData);
        setmemMBData(memMBData);
        setcpuUtilData(cpuUtilData);
        setcpuThreadData(cpuThreadData);
        setmemUtilData(memUtilData);
        setmemPerData(memPerData);

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
                <Grid
            containers
            justifyContent="center"
            direction="row"
            alignItems="center"
            spacing={3}
            sx={{ mt: 4 }}
          >
            <Grid item xs>
              <ShowPlotButton
                onClick={handleShowTrainResult}
                to={`/task/${_id}/trainplot`} // Specify the target page
                disabled={false}
                text="Train Plot"
              />
            </Grid>
            <Grid item xs>
              <ShowPlotButton
                onClick={handleShowTrainResult}
                to={`/task/${_id}/testplot`} // Specify the target page
                disabled={false}
                text="test Plot"
              />
            </Grid>
          </Grid>
                <Grid container spacing={1}>
                        {netData && (
                            <Line
                                data={netData}
                                options={chartOptions}
                            />
                        )}
                        {diskData && (
                            <Line
                                data={diskData}
                                options={chartOptions}
                            />
                        )}
                        {memMBData && (
                            <Line
                                data={memMBData}
                                options={chartOptions}
                            />
                        )}
                        {cpuUtilData && (
                            <Line
                                data={cpuUtilData}
                                options={chartOptions}
                            />
                        )}
                        {cpuThreadData && (
                            <Line
                                data={cpuThreadData}
                                options={chartOptions}
                            />
                        )}
                        {memUtilData && (
                            <Line
                                data={memUtilData}
                                options={chartOptions}
                            />
                        )}
                        {memPerData && (
                            <Line
                                data={memPerData}
                                options={chartOptions}
                            />
                        )}
                </Grid>
            </ContentWrapper>
        </div>
    )
}
export default PlotPage;