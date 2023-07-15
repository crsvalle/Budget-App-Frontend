import React from 'react'
import "./ModalWin.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;


export default function ModalWin({index, setModal}) {
    let navigate = useNavigate();
    const handleDelete = () => {
        axios
          .delete(`${API}/transactions/${index}`)
          .then(() => {
            navigate(`/transactions`);
            window.location.reload();
          })
          .catch((e) => console.error(e));
      };

      function handleCancel(){
        setModal(false)
      }
  return (
    <div>
        <section class="modal hidden">
            <div class="flex">
                <div></div>
                <button class="btn-close" onClick={handleCancel}>⨉</button>
            </div>
            <div className='text'>
                <h3>Confirmation</h3>
                <p>
                Are you sure you want to delete this?
                </p>
            </div>
            <button class="btn" onClick={handleDelete}>Delete</button>
            <button className='' onClick={handleCancel}>Cancel</button>
        </section>

        <div class="overlay hidden"></div>
</div>
  )
}
