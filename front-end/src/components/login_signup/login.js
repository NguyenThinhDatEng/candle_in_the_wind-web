import React, { Component } from "react";

export default class Login extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid bg-login">
                    <div className="row justify-content-center">
                        <div className="col-md-3 col-sm-6 col-xs-12 login-container">
                            <form>
                                <h1 className="login-title mb-4">Sign in</h1>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control mb-4"
                                        id="email"
                                        placeholder="Enter email"
                                    />
                                    {/* <p class="emailError"></p> */}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control mb-4"
                                        id="password"
                                        placeholder="Password"
                                    />
                                    {/* <p class="passwordError"></p> */}
                                </div>
                                <div className="text-center">
                                    <p className="forgot-password">
                                        {" "}
                                        <a href="#!">Forgot password?</a>{" "}
                                    </p>
                                    <div className="clearfix" />
                                    <button
                                        type="submit"
                                        className="btn btn-success my-3"
                                    >
                                        Sign in
                                    </button>
                                    <p>
                                        Don't have an account?{" "}
                                        <a href="/signup">Sign up</a>{" "}
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
