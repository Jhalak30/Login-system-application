import React, { useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import AboutUs from "./containers/AboutUs";
import Career from "./containers/Carrer";
import ContactUs from "./containers/ContactUs";
import { isUserLoggedIn } from "./actions";
import PrivateRoute from "./components/PrivateRoute";
import Privacy from "./components/Privacy";
import ForgotPass from "./components/ForgotPass";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) dispatch(isUserLoggedIn());
  }, []);
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/aboutUs" component={AboutUs} />
        <PrivateRoute path="/career" component={Career} />
        <PrivateRoute path="/contactUs" component={ContactUs} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/forgotPassword" component={ForgotPass} />
      </Switch>
    </div>
  );
}

export default App;
