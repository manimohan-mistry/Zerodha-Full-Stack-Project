import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {

  const [allOrders, setAllOrders] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3002/allOrders").then((res) => {
      setAllOrders(res.data);
    });
  }, []);

  return (
    <div className="orders">
      <div>
        <h1 className="title">Orders ({allOrders.length})</h1>
      </div>
      <div className="order-table">
        <table>
          <tr>
            <th>Name.</th>
            <th>Qty.</th>
            <th>Price.</th>
          </tr>

          {
            allOrders.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profitClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.price}</td>
                </tr>
              );
            })
          }
        </table>
      </div>




      {/* <div className="no-orders"> 
        <p>You haven't placed any orders today</p>
        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div> */}
    </div>
  );
};

export default Orders;

{/* <div className="no-orders"> 
        
        <p>You haven't placed any orders today</p>
        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div> */}