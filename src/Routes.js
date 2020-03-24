import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Blog from "./containers/Blog";
import Finder from "./containers/Finder";
import FinderStep from "./containers/FinderStep";
import Theories from "./containers/Theories";
import Sources from "./containers/Sources";
import Source from "./containers/Source";
import People from "./containers/People";
import Plato from "./containers/Plato";
import Contact from "./containers/Contact";
import About from "./containers/About";
import NotFound from "./containers/NotFound";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/dialogue" exact component={Blog} appProps={appProps} />
      <AppliedRoute path="/theories" exact component={Theories} appProps={appProps} />
      <AppliedRoute path="/sources" exact component={Sources} appProps={appProps} />
      <AppliedRoute path="/sources/:source" exact component={Source} appProps={appProps} />
      <AppliedRoute path="/people" exact component={People} appProps={appProps} />
      <AppliedRoute path="/plato" exact component={Plato} appProps={appProps} />
      <AppliedRoute path="/finder" exact component={Finder} appProps={appProps} />
      <AppliedRoute path="/finder/:step" exact component={FinderStep} appProps={appProps} />
      <AppliedRoute path="/about" exact component={About} appProps={appProps} />
      <AppliedRoute path="/contact" exact component={Contact} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}