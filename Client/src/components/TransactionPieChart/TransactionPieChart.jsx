import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
const TransactionPieChart = ({month}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = () => {
        axios.get('http://localhost:8000/api/v1/charts/pie-chart', {
            params: {
                month: month
            }
        })
        .then(response => {
            setData(response.data);
            console.log('piechart:',response.data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {

        fetchData();
    }, [month]);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <h2>Transaction Pie for <span>{month}</span></h2>
            <Pie data={{
                labels: data.map(d => d._id),
                datasets: [
                    {
                        label: 'Transaction Pie Chart',
                        data: data.map(d => d.count),
                    }
                ]
            }} />
        </div>
    );
};

export default TransactionPieChart;
