import { Link } from "react-router-dom";
import "./NavBar.css"
import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;


export default function NavBar() {
  const [total, setTotal] = useState(0)
  const [inital, setInital] =useState([])

  useEffect(()=>{
      axios
          .get(`${API}/transactions`)
          .then((response) => {
            setInital(response.data.map(({amount}) => Number(amount)).reduce((a,b) => a + b, 0))
            setTotal(inital.toFixed(2))
          })
          .catch((e) => console.error("catch", e));
  });

  return (  
    <nav>
      <div className="left">
        <h2 className="add">
          <Link className="link homeButton" to="/transactions">Home</Link>
        </h2>
        <button className="add">
          <Link className="link addTrans" to="/transactions/new">Add a Transaction</Link>
        </button>
      </div>

      <div>
        <h2>
        {total < 0 ? 
              <p> Owe: <span style={{color:"red"}}>${total} </span></p>
              :
              total > 0 && total <100 ?
                <p> Total: <span style={{color:"#fcd200"}}>${total} </span></p>:
                <p> Total: <span style={{color:"green"}}>${total} </span></p>}
        </h2>
      </div>

    </nav>
  );
}