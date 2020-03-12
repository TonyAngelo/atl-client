import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Theories from "./containers/Theories";
import Sources from "./containers/Sources";
import People from "./containers/People";
import Plato from "./containers/Plato";
import Contact from "./containers/Contact";
import About from "./containers/About";
import NotFound from "./containers/NotFound";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/theories" exact component={Theories} appProps={appProps} />
      <AppliedRoute path="/sources" exact component={Sources} appProps={appProps} />
      <AppliedRoute path="/people" exact component={People} appProps={appProps} />
      <AppliedRoute path="/plato" exact component={Plato} appProps={appProps} />
      <AppliedRoute path="/about" exact component={About} appProps={appProps} />
      <AppliedRoute path="/contact" exact component={Contact} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}