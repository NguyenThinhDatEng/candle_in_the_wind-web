import React, { useState } from "react";
import "./forgot_password.css";
import { Link, useHistory } from "react-router-dom";
import { handleResetPassword } from "../../services/customerService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrMessage("Missing inputs parameter!");
      return;
    }
    try {
      setErrMessage("checking...");
      await handleResetPassword(email).then((response) => {
        setErrMessage(response.data.msg);
        localStorage.setItem(
          "user-email-id",
          JSON.stringify(response.data.data)
        );
      });
      history.push("/verifyOTP");
    } catch (error) {
      console.log("login.js", error);
      setErrMessage(error.response.data.msg);
    }
  };

  return (
    <div className="banner">
      <div class="container padding-bottom-3x mb-2 mt-5">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10">
            <div class="forgot">
              <h2>Forgot password?</h2>

              <ol class="list-unstyled" style={{ "text-align": "left" }}>
                <li>
                  <span
                    class="text-primary text-medium"
                    style={{ fontSize: 20 }}
                  >
                    1.{" "}
                  </span>
                  <b>Enter your email address below</b>
                </li>
                <li>
                  <span
                    class="text-primary text-medium"
                    style={{ fontSize: 20 }}
                  >
                    2.{" "}
                  </span>
                  <b>Our system will send you an OTP code</b>
                </li>
                <li>
                  <span
                    class="text-primary text-medium"
                    style={{ fontSize: 20 }}
                  >
                    3.{" "}
                  </span>
                  <b>Enter OTP code to reset your password</b>
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
                    class="form-control emailResetInput"
                    type="email"
                    id="email-for-pass"
                    placeholder="Enter your email address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrMessage("");
                    }}
                  />
                </div>
              </div>
              <div class="card-footer">
                {" "}
                <button class="btn btn-primary" type="submit">
                  Reset password
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

export default ForgotPassword;
