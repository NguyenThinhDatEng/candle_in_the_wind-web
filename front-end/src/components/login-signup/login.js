import React, { useState } from "react";
import { use } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { handleSignInAPI } from "../../services/customerService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrMessage("Missing inputs parameter!");
    } else {
      try {
        console.log(`email: ${email}\npassword: ${password}`);
        await handleSignInAPI(email, password)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setErrMessage(response.data.msg);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error.response);
      }
    }
  };
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
                <a href="#">Forgot password?</a>{" "}
              </p>
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
