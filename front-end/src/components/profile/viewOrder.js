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
    // console.info(data);
    setOrders(data.data);
  }, []);

  return (
    <div className="col-md-3 col-sm-6 col-xs-12 change-form">
      <h3 className="text-center my-4">Your Orders</h3>
      <div className="table-responsive order-scrollbar">
        <table className="table bg-light table-striped ">
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
            {orders ? (
              orders.map((value, index) => {
                console.info("abc");
                return (
                  <tr>
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
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>No Order Yet</th>
                <th></th>
                <th></th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
