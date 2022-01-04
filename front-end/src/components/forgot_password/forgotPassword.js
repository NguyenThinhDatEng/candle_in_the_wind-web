import React, { useState } from "react";
import "./forgot_password.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkInput()) {
      return;
    }
  };

  const checkInput = () => {
    if (email.indexOf("@") === -1 || email.indexOf("@") === email.length - 1) {
      setErrMessage("Email Invalid");
      return false;
    }
    return true;
  };
  return (
    <div className="banner">
      <div class="container padding-bottom-3x mb-2 mt-5">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10">
            <div class="forgot">
              <h2>Forgot your password?</h2>

              <ol class="list-unstyled" style={{ "text-align": "left" }}>
                <li>
                  <span class="text-primary text-medium">1. </span>Enter your
                  email address below.
                </li>
                <li>
                  <span class="text-primary text-medium">2. </span>Our system
                  will send you a temporary link
                </li>
                <li>
                  <span class="text-primary text-medium">3. </span>Use the link
                  to reset your password
                </li>
              </ol>
            </div>
            <form class="card mt-4">
              <div class="card-body">
                <div class="form-group">
                  {" "}
                  <label for="email-for-pass">
                    Enter your email address
                  </label>{" "}
                  <input
                    class="form-control"
                    type="text"
                    id="email-for-pass"
                    required=""
                  />
                  <small class="form-text text-muted">
                    Enter the email address. Then we'll email a link to this
                    address.
                  </small>{" "}
                </div>
              </div>
              <div class="card-footer">
                {" "}
                <button class="btn btn-success" type="submit">
                  Get New Password
                </button>{" "}
                <button class="btn btn-danger" type="submit">
                  Back to Login
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
