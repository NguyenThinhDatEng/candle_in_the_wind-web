import React, { useState } from "react";
import "./forgot_password.css";
import { Link, useHistory } from "react-router-dom";
import { handleUpdatePasswordAPI } from "../../services/customerService";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const history = useHistory();
  const data = JSON.parse(localStorage.getItem("user-email-id"));

  const checkInput = () => {
    if (password.length < 6) {
      setErrMessage("Your password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setErrMessage("Your confirmation password does not match");
      return false;
    }
    return true;
  };

  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleShowHideConfirm = () => {
    setIsShowConfirm(!isShowConfirm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkInput()) return;
    let id = data.id;
    try {
      setErrMessage("loading...");
      await handleUpdatePasswordAPI(id, password).then((response) => {
        setErrMessage(response.data.msg);
        history.push("/login");
        localStorage.removeItem("user-email-id");
      });
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
              <h2>Reset password</h2>
              <ol class="list-unstyled" style={{ "text-align": "left" }}>
                <li style={{ color: "khaki" }}>
                  To make your password stronger, use upper and lower case
                  letters, numbers, and symbols like ! " ? $ % ^ & ) .
                </li>
              </ol>
            </div>
            {/* --------------------------------- form ---------------------------------------- */}
            <form class="card mt-2 col-8" onSubmit={handleSubmit}>
              <div class="card-body">
                <p style={{ textAlign: "center" }}>
                  <b>{data?.email}</b>
                </p>
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
                  <div className="customize-input-newPassword">
                    {/* input password*/}
                    <input
                      class="form-control"
                      type={isShowPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrMessage("");
                      }}
                    />
                    {/* eye */}
                    <span onClick={handleShowHidePassword}>
                      <i
                        className={
                          isShowPassword
                            ? "fas fa-eye newPassword_eye"
                            : "fas fa-eye-slash newPassword_eye"
                        }
                      ></i>
                    </span>
                  </div>
                  <div className="customize-input-newPassword">
                    {/*input confirm password*/}
                    <input
                      class="form-control"
                      type={isShowConfirm ? "text" : "password"}
                      placeholder="Confirm the new password"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrMessage("");
                      }}
                    />
                    {/* eye */}
                    <span onClick={handleShowHideConfirm}>
                      <i
                        className={
                          isShowConfirm
                            ? "fas fa-eye newPassword_eye"
                            : "fas fa-eye-slash newPassword_eye"
                        }
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                {" "}
                <button class="btn btn-primary" type="submit">
                  <b>Done</b>
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

export default UpdatePassword;
