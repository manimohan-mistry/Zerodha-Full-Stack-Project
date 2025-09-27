import React from "react";
import { positions } from "../data/data";
import { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

const Positions = () => {

  let [allPositions, setAllPositions] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3002/allPositions").then((res) => {
      setAllPositions(res.data);
    });
  }, []);


  let labels = allPositions.map((item) => item.name);

  const data = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: allPositions.map((item) => item.price),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }
    ]

  }
  return (
    <>
      <div className="order-table" style={{marginBottom:"3rem"}}>
        <p className="title">Positions ({allPositions.length})</p>
        <table>
          <tr>
            <th>Product</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
          {
            allPositions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profitClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{Number(stock?.avg ?? 0).toFixed(2)}</td>
                  <td>{Number(stock?.price ?? 0).toFixed(2)}</td>
                  <td className={profitClass}>{(Number(curValue ?? 0) - Number(stock?.avg ?? 0) * Number(stock?.qty ?? 0)).toFixed(2)}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })
          }
        </table>

      </div >
      <Doughnut data={data} />
    </>
  );
};

export default Positions;