import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../components/login_signup/login";
import Signup from "../components/login_signup/signup";
import Profile from "../components/profile/profile"

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/profile" component={Profile} />
            </Switch>
        </Router>
    );
}

export default App;
