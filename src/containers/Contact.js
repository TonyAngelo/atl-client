import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import MyAlert from "../components/Alert";
import PageTitle from "../components/PageTitle";
import RegularPage from "../components/RegularPage";
//import "./Home.css";

export default function Contact(props) {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
      const queryStr = "pages?slug=contact";
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
        title={"Contact"}
        link={"https://atlantis.fyi/contact"} 
      />
      <MyAlert show={errors} text="Page loaded with error(s)" />
      <PageTitle loaded={props.isLoaded}>Contact</PageTitle>
      <RegularPage
        data = {data}
      />
    </main>
  );
}