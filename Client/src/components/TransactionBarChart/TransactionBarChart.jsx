import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
const TransactionBarChart = ({month}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBarChart = () => {
        axios.get('http://localhost:8000/api/v1/charts/bar-chart', {
            params: {
                month: month
            }
        })
        .then(response => {
            setData(response.data);
            console.log('barchart:',response.data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        fetchBarChart();
    }, [month]);
    return(
        <div>
            <h2>Bar Chart for <span>{month}</span></h2>
            <Bar data = {{
                labels:['0-100','101-200','201-300','301-400','401-500','501-600','601-700','701-800','801-900','901+'],
                datasets: [
                    {
                        label: 'Items Sold',
                        data : data.map(item => item.count),
                    }
                ]}}
                options = {{
                    scales: {
                        y: {
                            ticks: {
                                stepSize: 1,
                            },
                            beginAtZero: true
                        }
                    }
                }}
            />
        </div>
    )
}

export default TransactionBarChart;
