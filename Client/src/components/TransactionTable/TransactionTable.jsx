import axios from 'axios';
import {useState, useEffect} from 'react';
const TransactionTable = (props) => {
    const {page,limit,search,month} = props.props;
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const fetchTransactions = () => {
        axios.get('https://roxiler-assignment-ql8o.onrender.com/api/v1/transactions',{
          params: {
            page:page,
            limit:limit,
            month:month,
            search:search
          }
        })
          .then(response => {
            setTransactions([])
            const data = response.data.transaction;
            data.map((transaction) => {
                setTransactions(prevState => [...prevState, {
                    id: transaction.id,
                    title: transaction.title,
                    price: transaction.price,
                    description: transaction.description,
                    category: transaction.category,
                    sold: transaction.sold? 'Yes' : 'No',
                    date: new Date(transaction.dateOfSale).toLocaleDateString()
                }])
            })
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
          });
      }
    
      useEffect(() => {
        fetchTransactions();
      }, [month,search,page,limit]);
    return (
        <div className="transaction--table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <tr><td>Loading...</td></tr> : transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.title}</td>
                            <td>{transaction.price}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.sold}</td>
                            <td>{transaction.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default TransactionTable;
