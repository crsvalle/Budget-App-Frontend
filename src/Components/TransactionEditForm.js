import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";    
import axios from "axios";
import './TransactionForm.css'

const API = process.env.REACT_APP_API_URL;

export default function TransactionEditForm() {
  let { index } = useParams();
  const navigate = useNavigate();
  

  const [transaction, setTransaction] = useState({
    name: "",
    amount: "",
    date: 0,
    from: "",
    category:"",
  });

  useEffect(() => {
    axios
      .get(`${API}/transactions/${index}`)
      .then((response) => {
        setTransaction(response.data);
      })
      .catch(() => {
        navigate("/not-found");
      });
  }, [index, navigate]);

  const updateTransaction = () => {
    axios
      .put(`${API}/transactions/${index}`, transaction)
      .then((response) => {
        setTransaction(response.data);
        navigate(`/transactions/${index}`);
        window.location.reload();
      })
      .catch((c) => console.warn("catch", c));
  };

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateTransaction();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="labelSection">
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
        <div className="labelSection">
          <label htmlFor="date">Date:</label>
          <input
          id="date"
          value={transaction.date}
          type="date"
          onChange={handleTextChange}
          required
          />
        </div>
        <div className="labelSection">
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

    <input className="submit" type="submit"  value="Done"/>

      </form>

    </div>
  )
}
