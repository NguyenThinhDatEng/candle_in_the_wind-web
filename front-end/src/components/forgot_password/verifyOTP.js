import React, { useState } from "react";
import "./forgot_password.css";
import { Link } from "react-router-dom";
import { handleCheckEmail } from "../../services/customerService";

const VerifyOTP = () => {
  const [OTP, setOTP] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (OTP.length != 6) {
      setErrMessage("OTP code consists of 6 characters");
      return;
    }
    //   try {
    //     setErrMessage("checking...");
    //     await handleCheckEmail(email).then((response) => {
    //       setErrMessage(response.data.msg);
    //     });
    //   } catch (error) {
    //     console.log("login.js", error);
    //     setErrMessage(error.response.data.msg);
    //   }
  };

  return (
    <div className="banner">
      <div class="container padding-bottom-3x mb-2 mt-5">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10">
            <div class="forgot">
              <h2>Verify OTP code</h2>
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
