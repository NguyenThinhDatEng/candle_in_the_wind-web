import React, { Component } from "react";
import CardInfo from "./card.info";
import Infor from "./infor";
import ChangePassword from "./change.password";
import MyOrder from "./my.order";
import ChangeInfo from "./change.info";
import { useEffect, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import axios from "axios";

export default function Profile(props) {
  const [status, setStatus] = useState(0);

  const displayCheck = () => {
    if (status === 0) {
      return <Infor />;
    } else if (status === 1) {
      return <ChangeInfo />;
    } else if (status == 2) {
      return <ChangePassword />
    } else {
      return <MyOrder />;
    }
  };
  const isAuth = () => {

    if (localStorage.getItem("user-info")) {
      return JSON.parse(localStorage.getItem("user-info"));
    } else {
      return false;
    }
  }
  const id = isAuth() ? isAuth().id : '';

  const [data, setData] = useState([]);

  useEffect(async () => {
    const result = await axios(
      process.env.REACT_APP_SERVER_URL + "/customers/" + id
    );
    setData(result.data);
  });

  return (
    <div>
      <Header />
      <div className="profile">
        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-6 col-xs-12 card-info">
            <div>
              <img
                className="card-avatar rounded-circle mb-4"
                src={data?.avatar?.url ? process.env.REACT_APP_SERVER_URL + data?.avatar?.url : "https://bootdey.com/img/Content/avatar/avatar1.png"}
                alt="Card_image"
                style={{ width: "100%" }}
              />
              <h4 className="text-center">Harry</h4>
            </div>
            <div className="card-body">
              <div className="row list-change">
                <li>
                  <i className="fas fa-user-edit" />{" "}
                  <a href="#!" onClick={() => setStatus(1)}>
                    {" "}
                    Change information{" "}
                  </a>{" "}
                </li>
                <li>
                  <i className="fas fa-lock"> </i>{" "}
                  <a href="#" onClick={() => setStatus(2)}>
                    {" "}
                    Change password{" "}
                  </a>{" "}
                </li>
                <li>
                  <i className="fas fa-file-alt" />{" "}
                  <a href="#!" onClick={() => setStatus(3)}>
                    {" "}
                    My orders{" "}
                  </a>{" "}
                </li>
              </div>
            </div>
          </div>
          <div className="col-1 vertical-line"></div>

          {displayCheck()}
        </div>
      </div>

      <Footer />
    </div>
  );
}
