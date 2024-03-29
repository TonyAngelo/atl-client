import React from "react";
import { Route, Switch } from "react-router-dom";
import { Router } from "@reach/router"
import AppliedRoute from "./components/AppliedRoute";
import Home from "./containers/Home";
import Blog from "./containers/Blog";
import BlogPost from "./containers/BlogPost";
import BlogCategory from "./containers/BlogCategory";
import BlogTag from "./containers/BlogTag";
import BlogSearch from "./containers/BlogSearch";
import Finder from "./containers/Finder";
import FinderReal from "./containers/FinderReal";
import Theories from "./containers/Theories";
import Theory from "./containers/Theory";
import Sources from "./containers/Sources";
import Source from "./containers/Source";
import People from "./containers/People";
import Person from "./containers/Person";
import Plato from "./containers/Plato";
import Contact from "./containers/Contact";
import About from "./containers/About";
import Timeline from "./containers/Timeline";
import NotFound from "./containers/NotFound";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/blog" exact component={Blog} appProps={appProps} />
      <AppliedRoute path="/blog/old/:page" exact component={Blog} appProps={appProps} />
      <AppliedRoute path="/blog/category/:category" exact component={BlogCategory} appProps={appProps} />
      <AppliedRoute path="/blog/tag/:tag" exact component={BlogTag} appProps={appProps} />
      <AppliedRoute path="/blog/:post" exact component={BlogPost} appProps={appProps} />
      <AppliedRoute path="/search/:search" exact component={BlogSearch} appProps={appProps} />
      <AppliedRoute path="/theories" exact component={Theories} appProps={appProps} />
      <AppliedRoute path="/theories/:theory" exact component={Theory} appProps={appProps} />
      <AppliedRoute path="/sources" exact component={Sources} appProps={appProps} />
      <AppliedRoute path="/sources/:source" exact component={Source} appProps={appProps} />
      <AppliedRoute path="/people" exact component={People} appProps={appProps} />
      <AppliedRoute path="/people/:person" exact component={Person} appProps={appProps} />
      <AppliedRoute path="/plato" exact component={Plato} appProps={appProps} />
      <AppliedRoute path="/finder" exact component={Finder} appProps={appProps} />
      <AppliedRoute path="/finder/real" exact component={FinderReal} appProps={appProps} />
      <AppliedRoute path="/about" exact component={About} appProps={appProps} />
      //<AppliedRoute path="/contact" exact component={Contact} appProps={appProps} />
      <AppliedRoute path="/timeline" exact component={Timeline} appProps={appProps} />

      <Route component={NotFound} />
    </Switch>
  );
}