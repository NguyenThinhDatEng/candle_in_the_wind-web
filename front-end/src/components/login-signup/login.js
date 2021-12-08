import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div>
            <div className="container-fluid bg-login login-container">
                <main className="login-form">
                    <form>
                        <h1 className="login-title mb-4 ">Sign in</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control mb-4" id="email" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="label">Password</label>
                            <input type="password" className="form-control mb-4" id="password" placeholder="Password" />
                        </div>
                        <div className="text-center">
                            <p className="forgot-password"> <a href="#">Forgot password?</a> </p>
                            <div className="clearfix" />
                            <button type="submit" className="btn btn-success my-3">Sign in</button>
                            <p>Don't have an account? <Link to="/signup">Sign up</Link> </p>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    )
}
