import React, { useState } from "react";
import "./forgot_password.css";
import { Link, useHistory } from "react-router-dom";
import { handleVerifyOTP } from "../../services/customerService";

const VerifyOTP = () => {
  const [OTP, setOTP] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (OTP.length != 6) {
      setErrMessage("OTP code consists of 6 characters");
      return;
    }
    let email = JSON.parse(localStorage.getItem("user-email-id")).email;
    try {
      setErrMessage("checking...");
      await handleVerifyOTP(email, OTP).then((response) => {
        setErrMessage(response.data.msg);
        history.push("./updatePassword");
      });
    } catch (error) {
      let res = error.response.data;
      console.log("login.js", res);
      if (res.status) setErrMessage(res.msg);
      else setErrMessage("Server Error");
    }
  };

  return (
    <div className="banner">
      <div class="container padding-bottom-3x mb-2 mt-5">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10">
            <div class="forgot">
              <h2>Code Verification</h2>
              <ol class="list-unstyled" style={{ "text-align": "left" }}>
                <li>
                  <b>We've sent a password reset otp to your email</b>
                </li>
              </ol>
            </div>
            {/* --------------------------------- form ---------------------------------------- */}
            <form class="card mt-2 col-8" onSubmit={handleSubmit}>
              <div class="card-body">
                <div class="form-group">
                  {/* errMessage */}
                  <div
                    style={{
                      color: "red",
                      "margin-bottom": "5px",
                      "text-align": "center",
                    }}
                  >
                    <b>{errMessage}</b>
                  </div>
                  {/* input */}
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Enter OTP code"
                    onChange={(e) => {
                      setOTP(e.target.value);
                      setErrMessage("");
                    }}
                  />
                </div>
              </div>
              <div class="card-footer">
                {" "}
                <button class="btn btn-primary" type="submit">
                  Submit
                </button>{" "}
                <button class="btn btn-secondary" type="submit">
                  <Link
                    to="/login"
                    style={{ "text-decoration": "none", color: "white" }}
                  >
                    Back to Login
                  </Link>
                </button>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
