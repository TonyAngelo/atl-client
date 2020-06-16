import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import MyAlert from "../components/Alert";
import PageTitle from "../components/PageTitle";
import RegularPage from "../components/RegularPage";
//import { headerValues } from "../libs/categories";
//import "./Home.css";

export default function About(props) {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    async function onLoad() {
      const queryStr = "pages?slug=about";
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
        setErrors(true);
      }
      props.setIsLoaded(true);
    }

    onLoad();
  }, [props.location.pathname]);

  return (
    <main>
      <StandardHelmet 
        title={"About"}
        link={"https://atlantis.fyi/about"} 
      />
      <MyAlert show={errors} text="Page loaded with error(s)" />
      <PageTitle loaded={props.isLoaded}>About</PageTitle>
      <RegularPage
        data = {data}
      />
    </main>
  );
}