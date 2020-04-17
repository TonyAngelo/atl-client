import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import { defaultDescription } from "../libs/seo";
import {Helmet} from "react-helmet";
import PageTitle from "../components/PageTitle";
import RegularPage from "../components/RegularPage";
//import { headerValues } from "../libs/categories";
//import "./Home.css";

export default function About(props) {
  const [data, setData] = useState({});
  const queryStr = "pages?slug=about&_embed";

  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
      //props.setNavKey(headerValues["About"]);

      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { 
          const payload = await response.json();
          //console.log(payload)
          setData(payload[0]);
        } 
      } catch (e) {
        alert(e);
      }
      props.setIsLoaded(true);
    }

    onLoad();
  }, []);

  return (
    <main>
      <Helmet>
        <title>About | Atlantis FYI</title>
        <link rel="canonical" href="https://atlantis.fyi/about" />
        <meta name="description" content={defaultDescription} />
      </Helmet>
      <PageTitle loaded={props.isLoaded}>About</PageTitle>
      <RegularPage
        data = {data}
      />
    </main>
  );
}