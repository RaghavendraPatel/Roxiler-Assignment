import axios from 'axios';
import { useEffect, useState } from 'react';
import TransactionTable from './components/TransactionTable/TransactionTable';
import TransactionStatistics from './components/TransactionStatistics/TransactionStatistics';
import TransactionBarChart from './components/TransactionBarChart/TransactionBarChart';
import TransactionPieChart from './components/TransactionPieChart/TransactionPieChart';

import './style.scss';
function App() {

  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const handleMonth = (e) => {
    console.log(e.target.value);
    setMonth(e.target.value);
  }

  const handleSearch = () => {
    setSearch(document.getElementById('search').value);
  }

  return (
    <div className="App">
      <div className="header">
        <div className="title">
          <h1>Transaction Dashboard</h1>
        </div>
      </div>
      <div className="content">
        <div className="transaction--table container">
          <div className="control">
              <div className="search">
                <input type="text" id='search'/>
                <button onClick={handleSearch}>Search</button>
              </div>
              <div className="month">
                <select name="month" id="month" onChange={handleMonth} defaultValue={'March'}>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
            </div>
          <TransactionTable props= {{page,limit,search,month}} />
          <div className="page--control">
            <div className="page"><p>Page:</p> <span>{page}</span></div>
            <div className="prev-next">
              <button onClick={() => setPage(page-1)} disabled={page===1}>Prev</button>
              <button onClick={() => setPage(page+1)}>Next</button>
            </div>
            <div className="perpage"><p>Per Page:</p> <input type="number" value={limit} max={10} onChange={(e)=>setLimit(e.target.value)}/></div>
          </div>
        </div>
        <div className="container">
          <TransactionStatistics month={month} />
        </div>
        <div className="transaction--charts">
          <div className="barchart">
            <TransactionBarChart month={month} />
          </div>
          <div className="piechart">
            <TransactionPieChart month={month} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
