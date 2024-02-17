import axios from "axios";
import { useEffect, useState } from "react";
const TransactionStatistics = ({month}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStatistics = () => {
        axios.get('http://localhost:8000/api/v1/charts/statistics', {
            params: {
                month: month
            }
        })
        .then(response => {
            setData(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        });
    }
    useEffect(() => {
        fetchStatistics();
    }, [month]);

    return (
        <div className="transaction--statistics">
            <h2>Statistics</h2>
            <div className="cards">
                <div className="sale statistics--container">
                    <div className="title">Total Sale</div>
                    <div className="value">{data.totalSaleAmount}</div>
                </div>
                <div className="items statistics--container">
                    <div className="title">Total Items</div>
                    <div className="value">{data.totalItems}</div>
                </div>
                <div className="sold statistics--container">
                    <div className="title">Total Items Sold</div>
                    <div className="value">{data.totalSoldItems}</div>
                </div>
                <div className="unsold statistics--container">
                    <div className="title">Unsold Items</div>
                    <div className="value">{data.totalNotSoldItems}</div>
                </div>
            </div>
        </div>
    );
};

export default TransactionStatistics;