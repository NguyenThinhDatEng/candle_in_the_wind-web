import React, { Component, useContext } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import StoreCandle from "./store.candle";
import StoreScentedWax from "./store.scented-wax";
import StoreEssentialOil from "./store.essential-oil";
import StoreDecoration from "./store.decoration";
import axios from "axios";
import { useEffect, useState } from "react";
import { CartContext } from "../../context/Context";
import "../home/product.css";
import ReactLoading from "react-loading";
require("dotenv").config();

export default function Store(props) {
  const [status, setStatus] = useState(0);
  // const [data, setData] = useState([]);
  const { searchFilter, data } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const displayCheck = () => {
    if (status === 0) {
      return (
        <StoreCandle
          data={data.filter((val) => {
            if (searchFilter === "") {
              return val;
            } else if (
              val?.name.toLowerCase().includes(searchFilter.toLowerCase())
            ) {
              return val;
            }
          })}
        />
      );
    } else if (status === 1) {
      return (
        <StoreScentedWax
          data={data.filter((val) => {
            if (searchFilter === "") {
              return val;
            } else if (
              val?.name.toLowerCase().includes(searchFilter.toLowerCase())
            ) {
              return val;
            }
          })}
        />
      );
    } else if (status === 2) {
      return (
        <StoreEssentialOil
          data={data.filter((val) => {
            if (searchFilter === "") {
              return val;
            } else if (
              val?.name.toLowerCase().includes(searchFilter.toLowerCase())
            ) {
              return val;
            }
          })}
        />
      );
    } else {
      return (
        <StoreDecoration
          data={data.filter((val) => {
            if (searchFilter === "") {
              return val;
            } else if (
              val?.name.toLowerCase().includes(searchFilter.toLowerCase())
            ) {
              return val;
            }
          })}
        />
      );
    }
  };

  const displayBanner = () => {
    console.log("ok");
    if (status === 0) {
      return (
        <div className="image">
          <img
            // style={{ objectFit: "contain" }}
            src="/assets/images/candle02.jpg"
            alt=""
          />
        </div>
      );
    } else if (status === 1) {
      return (
        <div className="image">
          <img
            // style={{ objectFit: "contain" }}
            src="/assets/images/scented_wax02.jpg"
            alt=""
          />
        </div>
      );
    } else if (status === 2) {
      return (
        <div className="image">
          <img
            // style={{ objectFit: "contain" }}
            src="/assets/images/essential_oil02.jpg"
            alt=""
          />
        </div>
      );
    } else {
      return (
        <div className="image">
          <img
            // style={{ objectFit: "contain" }}
            src="/assets/images/decoration.jpg"
            alt=""
          />
        </div>
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="container">{displayBanner()}</div>

      <div className="text-center my-5">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setStatus(0)}
          >
            Candle
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => setStatus(1)}
          >
            Scented wax
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setStatus(2)}
          >
            Essential oil
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => setStatus(3)}
          >
            Decoration
          </button>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <>
            <div className="d-flex justify-content-center">
              <ReactLoading
                type="spinningBubbles"
                color="black"
                height={200}
                width={100}
              />
            </div>
          </>
        ) : (
          <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mb-5">
              {displayCheck()}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
