import {useEffect, useState} from 'react';
import { Bar, Line } from 'react-chartjs-2';
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

const Graph = obj => {
  const [chartData, setChartData] = useState({
    datasets: []
  });
  const [chartOptions, setChartOptions] = useState({})

  const [jsonData, setjsonData] = useState(machineJson)

  useEffect(() => {
        const allKeys = [];
        const allValues = [];
        const extractKeys = obj => {
            for (const key in obj) {
                allKeys.push(key);
                if (typeof obj[key] === 'object') {
                    extractKeys(obj[key]);
                }
            }
        };
        const extractValues = obj => {
            for (const key in obj) {
                if (typeof obj[key] === 'object') {
                    extractValues(obj[key]);
                } else {
                    allValues.push(obj[key]);
                }
            }
        };

        extractKeys(jsonData[key]);
        extractValues(jsonData[key]);

            setChartData({
            labels: allKeys,
            datasets: [
                {
                label: key,
                data: allValues,
                borderColor: "black",
                backgroundCOlor: "red"
                }
            ]
            });
            setChartOptions({
            responsive: true,
            plugins: {
                lelgend: {
                position: 'top'
                },
                title: {
                display: true,
                text: key
                }
            },
            interaction: {
                mode: "index",
                intersect: false,
            }
            })
        setchartArray({
            key: chartData
        });
    
    }, [])

    
  return (
        {
            chartData.datasets.length > 0 ? (
            <div>
                <Line options = {chartOptions} data = {chartData}/>
                </div>
                ) : (
                <div>
                    Loading...
                    </div>
                )
        }
  )

}
export default Graph;
