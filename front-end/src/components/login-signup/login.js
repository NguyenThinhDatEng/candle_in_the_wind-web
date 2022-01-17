import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { CartContext } from "../../context/Context";

import { handleSignInAPI } from "../../services/customerService";

import { getCartAPI } from "../../services/itemService";
import "./login.css";

const Login = () => {
  const { callOldCart } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/");
    }
  });

  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrMessage("Missing inputs parameter!");
    } else if (password.length < 6) {
      setErrMessage("Your password must be at least 6 characters");
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
              // console.info(typeof localStorage.getItem("user-info"));
              async function run() {
                const result = await getCartAPI(
                  JSON.parse(localStorage.getItem("user-info")).cart
                );

                callOldCart(result.data.data);
              }

              run();
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
                <Link to="/forgotPassword">Forgot password?</Link>
              </p>
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
