import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { handleChangePasswordAPI } from "../../services/customerService";

export default function ChangePassword() {
    const [state, setState] = useState({
        curPassword: "",
        newPassword: "",
        confirmPassword: "",
        errMessage: "",
        isShowPassword: false,
        isShowConfirm: false,
        isShowVerConfirm: false,
    });

    const handleCurPassword = (e) => {
        setState((previousState) => {
            return { ...previousState, curPassword: e.target.value };
        });
    };
    const handleNewPassword = (e) => {
        setState((previousState) => {
            return { ...previousState, newPassword: e.target.value };
        });
    };
    const handleConfirmPassword = (e) => {
        setState((previousState) => {
            return { ...previousState, confirmPassword: e.target.value };
        });
    };
    const handleShowHidePassword = () => {
        setState((previousState) => {
            return { ...previousState, isShowPassword: !state.isShowPassword };
        });
    };
    const handleShowHideConfirm = () => {
        setState((previousState) => {
            return { ...previousState, isShowConfirm: !state.isShowConfirm };
        });
    };
    const handleShowHideVerConfirm = () => {
        setState((previousState) => {
            return { ...previousState, isShowVerConfirm: !state.isShowVerConfirm };
        });
    };


    const isAuth = () => {

        if (localStorage.getItem("user-info")) {
            return JSON.parse(localStorage.getItem("user-info"));
        } else {
            return false;
        }
    }
    const id = isAuth() ? isAuth().id : '';
    const [data, setData] = useState([]);

    useEffect(async () => {
        const result = await axios(process.env.REACT_APP_SERVER_URL + "/customers/" + id);
        setData(result.data);
    });

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setState((previousState) => {
            return { ...previousState, errMessage: "" };
        });
        if (!state.curPassword || !state.newPassword || !state.confirmPassword) {
            setState((previousState) => {
                return { ...previousState, errMessage: "Missing required parameter!" };
            });
        } else if (state.newPassword.length < 6 || state.confirmPassword.length < 6)
            setState((previousState) => {
                return {
                    ...previousState,
                    errMessage:
                        "Your password must be at least 6 characters. Please try a different password",
                };
            });
        else if (state.newPassword !== state.confirmPassword)
            setState((previousState) => {
                return {
                    ...previousState,
                    errMessage:
                        "Your confirmation password does not match. Please try again",
                };
            });
        else {
            try {
                console.log(state);
                await handleChangePasswordAPI(isAuth().email, state.curPassword, state.confirmPassword)
                    .then((response) => {
                        console.log(JSON.stringify(response.data));
                        // setErrMessage(response.data.msg);
                        // setState.errMessage = response.data.msg;
                        setState((previousState) => {
                            return { ...previousState, errMessage: response.data.msg };
                        });

                    })
            } catch (error) {
                console.log(error.response.data.msg);
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
            <form onSubmit={handleChangePassword}>
                <h3 className=" my-5 text-center">Change Password</h3>
                <div className="form-group row my-4">
                    <label htmlFor="cur-password" className="col-sm-3 col-form-label">Your current password</label>
                    <div className="col-sm-9">
                        <div className="customize-input-password">
                            <input type={state.isShowPassword ? "text" : "password"} className="form-control" id="cur-password" value={state.curPassword}

                                onChange={handleCurPassword}
                            />
                            <span onClick={handleShowHidePassword}>
                                <i
                                    className={
                                        state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"
                                    }
                                ></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group row my-4">
                    <label htmlFor="new-password" className="col-sm-3 col-form-label">Your new password</label>
                    <div className="col-sm-9">
                        <div className="customize-input-password">
                            <input type={state.isShowConfirm ? "text" : "password"} className="form-control" id="new-password"

                                onChange={handleNewPassword}
                            />
                            <span onClick={handleShowHideConfirm}>
                                <i
                                    className={
                                        state.isShowConfirm ? "fas fa-eye" : "fas fa-eye-slash"
                                    }
                                ></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group row my-4">
                    <label htmlFor="vertify-password" className="col-sm-3 col-form-label">Vertify new
                        password</label>
                    <div className="col-sm-9">
                        <div className="customize-input-password">
                            <input type={state.isShowVerConfirm ? "text" : "password"} className="form-control" id="vertify-password"

                                onChange={handleConfirmPassword}
                            />
                            <span onClick={handleShowHideVerConfirm}>
                                <i
                                    className={
                                        state.isShowVerConfirm ? "fas fa-eye" : "fas fa-eye-slash"
                                    }
                                ></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="form-group row my-4 text-center">
                    <div className="col-sm-12">
                        <div style={{ color: "red" }} className="errMessage">
                            <b>{state.errMessage}</b>
                        </div>
                        <button type="submit" className="btn btn-primary " style={{ marginTop: "50px" }}>Save</button>
                    </div>
                </div>
            </form>
        </div>

    )
}