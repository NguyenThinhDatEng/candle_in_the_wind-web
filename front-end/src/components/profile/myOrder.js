import React from "react";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../services/customerService";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);
  const isAuth = () => {
    if (localStorage.getItem("user-info")) {
      return JSON.parse(localStorage.getItem("user-info"));
    } else {
      return false;
    }
  };
  const id = isAuth() ? isAuth().id : "";

  useEffect(async () => {
    const user = await getUserInfo(id);
    setOrders(user.orders);
  }, []);

  return (
    <div className="col-md-3 col-sm-6 col-xs-12 change-form">
      <h3 className="text-center my-4">My Orders</h3>
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
            {orders.map((value, index) => {
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
