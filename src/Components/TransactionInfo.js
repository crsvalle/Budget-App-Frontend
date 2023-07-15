import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom';
import "./TransactionInfo.css"
import ModalWin from './ModalWin';

const API = process.env.REACT_APP_API_URL; 

export default function TransactionInfo() {
  const [transaction, setTransaction] = useState([]);
  const [amount, setAmount] = useState(0)
  const [modal, setModal] = useState(false)
  let navigate = useNavigate();
  let {index} = useParams();


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
  
  useEffect(() => {
    setAmount(transaction.amount)
  },[transaction.amount])

  function handleModal(){
    setModal(true)
  }

  return (
    <div>
      {modal ? <ModalWin index={index} setModal={setModal} /> :null}
      <div className='bigBox'>
        <div className='header'>
          {!transaction.id ? 
          <h4>
            ID: <span style={{fontWeight:"normal"}}> Not Currently Available </span>
          </h4> : 
          <h4> ID: <span style={{fontWeight:"normal"}}>{transaction.id} </span></h4>
          }
          <h4>Date: <span style={{fontWeight:"normal"}}>
            {new Date(transaction.date).toDateString().split(' ').slice(1,2) + " " +
             new Date(transaction.date).toDateString().split(' ').slice(2).join(", ")}</span></h4>
        </div>

        <div>
          <p><span style={{fontWeight:"bold"}}>Name: </span>{transaction.name}</p>
            <div>{amount < 0 ? 
                  <p> <span style={{fontWeight:"bold"}}>Amount: </span><span style={{color:"red"}}>${amount} </span></p>:
                  <p> <span style={{fontWeight:"bold"}}>Amount: </span><span style={{color:"green"}}>${amount} </span></p>}
            </div>
            {transaction.amount < 0 ? 
            <p><span style={{fontWeight:"bold"}}>Paid to: </span> {transaction.from}</p>:
            <p><span style={{fontWeight:"bold"}}>Recieved by: </span> {transaction.from}</p>}
            <p><span style={{fontWeight:"bold"}}>Category: </span> {transaction.category}</p>
        </div>

      </div>

        <div className="showNavigation">
          <div className=''>
            {" "}
            <Link className='' to={`/transactions`}>
              <button className='navButton'>Back</button>
            </Link>
          </div>
          <div className=''>
            {" "}
            <Link to={`/transactions/${index}/edit`}>
              <button className='navButton'>Edit</button>
            </Link>
          </div>
          <div className=''>
            {" "}
            <button className='navButton' onClick={handleModal}>Delete</button>
          </div>
      </div>
    </div>
  )


}
