import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
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
      <StandardHelmet 
        title={"Contact"}
        link={"https://atlantis.fyi/contact"} 
      />
      <PageTitle loaded={props.isLoaded}>Contact</PageTitle>
      <RegularPage
        data = {data}
      />
    </main>
  );
}