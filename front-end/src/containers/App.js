import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../components/login-signup/login";
import Signup from "../components/login-signup/signup";
import Profile from "../components/profile/profile";
import Home from "../components/home/home";
import Store from "../components/store/store";
import Blog from "../components/blog/blog";
import CreatePost from "../components/post/create.post";
import AboutUs from "../components/about -us/aboutus";
import Post from "../components/post/post";
import Cart from "../components/cart/cart";
import PaymentInformation from "../components/payment/payment.information";
import Payment from "../components/payment/payment";
import Item from "../components/product/item";
import ForgotPassword from "../components/forgot_password/forgotPassword";
import VerifyOTP from "../components/forgot_password/verifyOTP";
import UpdatePassword from "../components/forgot_password/updatePassword";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT
};

function App() {
  return (
    <Router>
      <Switch>
        <Provider template={AlertTemplate} {...options}>
          <Route exact path="/" component={Home} />
          <Route exact path="/store" component={Store} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/create-post" component={CreatePost} />

          <Route exact path="/about-us" component={AboutUs} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/verifyOTP" component={VerifyOTP} />
          <Route exact path="/updatePassword" component={UpdatePassword} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/cart" component={Cart} />
          <Route
            exact
            path="/paymentinformation"
            component={PaymentInformation}
          />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/products/:id" component={Item} />

        </Provider>
      </Switch>
    </Router>
  );
}

export default App;
