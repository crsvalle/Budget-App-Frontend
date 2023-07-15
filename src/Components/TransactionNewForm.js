import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import"./TransactionForm.css"

const API = process.env.REACT_APP_API_URL;


export default function TransactionNewForm() {

  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    name: "",
    amount: "",
    date: "yyyy-MM-dd",
    from: "",
    category:"",
  });

  const addTransaction = (transaction) => {
    axios
    .post(`${API}/transactions`, transaction)
    .then(
    () => {
    navigate(`/transactions`);
    window.location.reload();
    })
    .catch((c) => console.error("catch", c));
   };

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTransaction(transaction);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="labelSection" >
          <label htmlFor="name">Transaction Name:</label>
          <input
          id="name"
          value={transaction.name}
          type="text"
          onChange={handleTextChange}
          required
          />
        </div>
        <div className="labelSection">
          <label htmlFor="amount">Amount:</label>
          <input
          id="amount"
          value={transaction.amount}
          type="number"
          onChange={handleTextChange}
          required
          />
        </div>
        <div className="labelSection" >
          <label htmlFor="date">Date:</label>
          <input
          id="date"
          defaultValue={transaction.date}
          type="date"
          onChange={handleTextChange}
          required
          />
        </div>
        <div className="labelSection" >
          <label htmlFor="from">From:</label>
          <input
          id="from"
          value={transaction.from}
          type="text"
          onChange={handleTextChange}
          />
        </div>
        <div className="labelSection"> 
          <label htmlFor="category">Category:</label>
          <select
          id="category"
          value={transaction.category}
          type="option"
          onChange={handleTextChange}
          >
            <option value=""></option>
            <option value="Grocery">Grocery</option>
            <option value="Dining">Dining</option>
            <option value="Gas">Gas</option>
            <option value="Travel">Travel</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Insurance">Insurance</option>
            <option value="Streaming Service">Streaming Service </option>
            <option value="Investing">Investing</option>
            <option value="Paycheck">Paycheck</option>
            <option value="Other">Other</option>
          </select> 
        </div>
        <br />

    <input className="submit" type="submit" />

      </form>

    </div>
  )
}
