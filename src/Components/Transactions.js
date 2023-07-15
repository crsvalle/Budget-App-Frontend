import React, { useEffect, useState } from 'react'
import Transaction from './Transaction';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(()=>{
        axios
            .get(`${API}/transactions`)
            .then((response) => setTransactions(response.data))
            .catch((e) => console.error("catch", e));
    },[]);

// response.data.sort((a,b) =>{return new Date(b.date) - new Date(a.date);})

  return (
    <div>
        <section>
            <table>
            <thead>
            <tr>
              <th>Date</th>
              <th>Transaction Name</th>
              <th>Amount</th>
            </tr>
          </thead>
                <tbody>
                    {transactions.map((transaction, index)=> {
                        return <Transaction key={index} transaction={transaction} index={index} />
                    })}
                </tbody>
            </table>
        </section>
    </div>
  )
}
