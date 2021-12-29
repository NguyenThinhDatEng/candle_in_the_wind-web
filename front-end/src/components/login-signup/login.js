import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { handleSignInAPI } from "../../services/customerService";
const baseUrl = "https://localhost:2021";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
    console.log(email);
  };

  const handleSignIn = async () => {
    try {
      // console.log(`email: ${email}\npassword: ${password}`);
      console.error(
        "------------------------------------------------------------------"
      );
      const { data } = await handleSignInAPI(email, password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container-fluid bg-login login-container">
        <main className="login-form">
          <form>
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
                  //   console.log(email);
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
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    //   console.log(password);
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
              <button
                type="submit"
                className="btn btn-success my-3"
                onClick={handleSignIn}
              >
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
