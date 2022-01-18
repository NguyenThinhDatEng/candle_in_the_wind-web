import React from "react";
import { useEffect, useState } from "react";
import { getOrders } from "../../services/customerService";

export default function YourOrder() {
  const [orders, setOrders] = useState([]);
  const isAuth = () => {
    if (localStorage.getItem("user-info")) {
      return JSON.parse(localStorage.getItem("user-info"));
    } else {
      return false;
    }
  };
  const customer = isAuth() ? isAuth().id : "";

  useEffect(async () => {
    const data = await getOrders(customer);
    // console.info(data.data);
    setOrders(data.data);
  }, []);

  return (
    <div className="col-md-3 col-sm-6 col-xs-12 change-form">
      <h3 className="text-center my-4">Your Orders</h3>
      <div className="table-responsive order-scrollbar">
        <table className="table bg-light table-striped">
          <caption style={{ color: "white" }}>List of orders</caption>
          <thead>
            <tr>
              <th scope="col">Serial</th>
              <th scope="col">Status</th>
              <th scope="col">Recipient</th>
              <th scope="col">Ordering date</th>
              <th scope="col">Payment</th>
              <th scope="col">Grand total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length ? (
              orders.map((value, index) => {
                console.info("abc");
                return (
                  <tr
                    className={
                      value.published_at ? "table-success" : "table-danger"
                    }
                  >
                    <th scope="row">{index + 1}</th>
                    <td>{value.published_at ? "confirm" : "Pending..."}</td>
                    <td>{value.fullname}</td>
                    <td>
                      {new Date(value.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td>{value.payment}</td>
                    <td>{value.grand_total}</td>
                  </tr>
                );
              })
            ) : (
              <tr class="table-dark">
                <th colspan="6" style={{ textAlign: "center", font: "30" }}>
                  No Order Yet
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
