import React from 'react'
import "./Transaction.css"

export default function Transaction({transaction, index}) {


    let money = Number(transaction.amount)
    money = money.toFixed(2);

    return( 
    <tr className="transaction">
        <td>
            {new Date(transaction.date).toDateString().split(' ').slice(1,3).join(" ") 
            }
        </td>
        <td>
            {money < 0 ?
            <a className='link red itemName' href={`/transactions/${index}`} >
                {transaction.name}
            </a>:
             <a className='link green itemName' href={`/transactions/${index}`} >
                {transaction.name}
            </a>
            }
        </td>
        <td>
            {money < 0? 
            <div style={{color:"red"}}>${money}</div>:
            <div style={{color:"green"}}>${money}</div>}
        </td>
    </tr>
  )
}
