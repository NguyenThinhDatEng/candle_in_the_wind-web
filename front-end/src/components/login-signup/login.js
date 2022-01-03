import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  handleSignInAPI,
  handleCheckEmail,
  handleCheckOTP,
} from "../../services/customerService";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [emailReset, setEmailReset] = useState("");
  const [dismissPopup, setDismissPopUp] = useState(false);
  const [errPopUp, setErrPopUp] = useState("");
  const [otp, setOTP] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/");
    }
  });

  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleOnClickReset = async () => {
    if (emailReset.indexOf("@") === -1)
      setErrPopUp("Please include an '@' in the email address");
    else if (emailReset.indexOf("@") === emailReset.length - 1)
      setErrPopUp("Please enter a part following '@'");
    else {
      try {
        setErrPopUp("checking...");
        if (dismissPopup) {
          await handleCheckOTP(emailReset, otp);
        } else {
          await handleCheckEmail(emailReset).then((response) => {
            setDismissPopUp(true);
            setErrPopUp("");
            // setEmailReset("");
            setOTP("123");
          });
        }
      } catch (error) {
        console.log("login.js", error);
        setErrPopUp(error.response.data.msg);
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrMessage("Missing inputs parameter!");
    } else {
      try {
        setErrMessage("checking...");
        await handleSignInAPI(email, password)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setErrMessage(response.data.msg);
            if (response.data.data) {
              localStorage.setItem(
                "user-info",
                JSON.stringify(response.data.data)
              );
            }
          })
          .catch((error) => {
            console.log("login.js", error);
          });
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  // ---------------------------------------------------------------
  return (
    <div>
      <div className="container-fluid bg-login login-container">
        <main className="login-form">
          <form onSubmit={handleSignIn}>
            <h1 className="login-title mb-4 ">Sign in</h1>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control mb-4"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrMessage("");
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="customize-input-password">
                <input
                  type={isShowPassword ? "text" : "password"}
                  className="form-control mb-4"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrMessage("");
                  }}
                />
                <span onClick={handleShowHidePassword}>
                  <i
                    className={
                      isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="forgot-password">
                {" "}
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                  onClick={() => setDismissPopUp(false)}
                >
                  Forgot password?
                </a>{" "}
              </p>
              {/* The Modal */}
              <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    {/* Modal Header */}
                    <div className="modal-header">
                      <h4 className="modal-title">
                        {dismissPopup
                          ? "Code Verification"
                          : "Forgot Password?"}
                      </h4>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        onClick={() => setErrPopUp("")}
                      ></button>
                    </div>

                    {/* Modal body */}
                    <div className="modal-body">
                      <div className="resetTitle">
                        <b>
                          {dismissPopup
                            ? "We've sent a password reset otp to your email"
                            : "You can reset your password here"}
                        </b>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={dismissPopup ? otp : emailReset}
                        placeholder={
                          dismissPopup ? "Enter code" : "your email address"
                        }
                        className="form-control mb-2"
                        onChange={(e) => {
                          dismissPopup
                            ? setOTP(otp)
                            : setEmailReset(e.target.value);
                          setErrPopUp("");
                        }}
                      />
                    </div>
                    {/* Modal footer */}
                    <div className="my-modal-footer">
                      <div className="errPopUp" style={{ color: "red" }}>
                        {errPopUp}
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-light"
                        data-bs-dismiss=""
                        onClick={handleOnClickReset}
                      >
                        {dismissPopup ? "Submit" : "Reset"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sign in */}
              <div className="clearfix" />
              <div style={{ color: "red" }}>{errMessage}</div>
              <button type="submit" className="btn btn-success my-3">
                Sign in
              </button>
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>{" "}
              </p>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
