import React from "react";

import axios from "axios";
import { useEffect, useState } from "react";
import { handleChangeInfoAPI } from "../../services/customerService";
import { useHistory } from "react-router-dom";
require("dotenv").config();

export default function ChangeInfo() {
  const isAuth = () => {
    if (localStorage.getItem("user-info")) {
      return JSON.parse(localStorage.getItem("user-info"));
    } else {
      return false;
    }
  };
  const id = isAuth() ? isAuth().id : "";

  const history = useHistory();

  const [state, setState] = useState({
    username: isAuth().username,
    email: isAuth().email,
    gender: true,
    dateOfBirth: isAuth().dateOfBirth,
    phoneNumber: isAuth().phoneNumber,
    errMessage: "",
  });
  const handleChangeUsername = (e) => {
    setState((previousState) => {
      return { ...previousState, username: e.target.value };
    });
  };

  const handleChangeDateOfBirth = (e) => {
    setState((previousState) => {
      return { ...previousState, dateOfBirth: e.target.value };
    });
  };
  const handleChangePhoneNumber = (e) => {
    setState((previousState) => {
      return { ...previousState, phoneNumber: e.target.value };
    });
  };
  const handeChangeInfo = async (e) => {
    e.preventDefault();
    setState((previousState) => {
      return { ...previousState, errMessage: "" };
    });
    if (
      !state.email ||
      !state.username ||
      !state.dateOfBirth ||
      !state.phoneNumber
    ) {
      setState((previousState) => {
        return { ...previousState, errMessage: "Missing required parameter!" };
      });
    } else if (state.phoneNumber.length < 10 || state.phoneNumber.length > 11)
      setState((previousState) => {
        return {
          ...previousState,
          errMessage: "Invalid phone number",
        };
      });
    else {
      try {
        console.log(state);
        await handleChangeInfoAPI(state).then((response) => {
          console.log(JSON.stringify(response.data));
          setState((previousState) => {
            return {
              ...previousState,
              errMessage: "Updated Successfully",
            };
          });
          console.log(response.data);
          if (response.data) {
            localStorage.setItem("user-info", JSON.stringify(response.data));
          }
        });
      } catch (error) {
        setState((previousState) => {
          return {
            ...previousState,
            errMessage: error.response.data.msg,
          };
        });
      }
    }
  };

  return (
    <div className="col-md-3 col-sm-6 col-xs-12 change-form">
      <h3 className="my-4 text-center"> Personal information</h3>
      <form onSubmit={handeChangeInfo}>
        <div className="form-group row my-4">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="username"
              value={state.username}
              onChange={handleChangeUsername}
            />
          </div>
        </div>
        {/* <div className="form-group row my-4">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" value={state.email}
                            onChange={handleChangeEmail} />
                    </div>
                </div> */}
        <fieldset className="form-group row my-4">
          <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
          <div className="col-sm-10 ">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio" // 01
                id="check1"
                name="gridRadios" // 02
                defaultValue="option1"
                defaultChecked
                onChange={() => {
                  setState((previousState) => {
                    return { ...previousState, gender: !state.gender };
                  });
                }}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="check2"
                name="gridRadios"
                defaultValue="option2"
                onChange={() => {
                  setState((previousState) => {
                    return { ...previousState, gender: !state.gender };
                  });
                }}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>
        </fieldset>
        <div className="form-group row my-4">
          <label htmlFor="date-of-birth" className="col-sm-2 col-form-label">
            Date of Birth
          </label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control text-center"
              id="date-of-birth"
              value={state.dateOfBirth}
              onChange={handleChangeDateOfBirth}
            />
          </div>
        </div>
        <div className="form-group row my-4">
          <label htmlFor="phone-number" className="col-sm-2 col-form-label">
            Phone number
          </label>
          <div className="col-sm-10">
            <input
              type="tel"
              className="form-control"
              id="phone-number"
              value={state.phoneNumber}
              onChange={handleChangePhoneNumber}
            />
          </div>
        </div>
        <div className="form-group row text-center">
          <div className="col-sm-12">
            <div style={{ color: "red" }} className="errMessage">
              <b>{state.errMessage}</b>
            </div>
            <button
              type="submit"
              className="btn btn-primary "
              style={{ marginBottom: "20px", marginTop: "50px" }}
            >
              Done
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
