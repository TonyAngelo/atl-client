import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import { defaultDescription } from "../libs/seo";
import {Helmet} from "react-helmet";
import PageTitle from "../components/PageTitle";
import RegularPage from "../components/RegularPage";
//import "./Home.css";

export default function Contact(props) {
  const [data, setData] = useState({});
  const queryStr = "pages?slug=contact&_embed";

  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
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
        <title>Contact | Atlantis FYI</title>
        <link rel="canonical" href="https://atlantis.fyi/contact" />
        <meta name="description" content={defaultDescription} />
      </Helmet>
      <PageTitle loaded={props.isLoaded}>Contact</PageTitle>
      <RegularPage
        data = {data}
      />
    </main>
  );
}