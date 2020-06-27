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
  const [image, setImage] = useState({});
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    async function onLoad() {
      const queryStr = "pages?slug=about";
      let payload = [];
      let response = "";
      let imageLink = "";
      props.setIsLoaded(false);
      //props.setNavKey(headerValues["About"]);

      try {
        response = await fetch(apiHeader + queryStr);
        if (response.ok) { 
          payload = await response.json();
          //console.log(payload)
          setData(payload[0]);
        } 
      } catch (e) {
        setErrors(true);
      }

      if('wp:featuredmedia' in payload[0]._links) {
        try {
          imageLink = payload[0]._links['wp:featuredmedia'][0].href;
          //console.log(imageLink)
          response = await fetch(imageLink);
          if (response.ok) { // ckeck if status code is 200
            const imgPayload = await response.json();
            //console.log(imgPayload);
            setImage(imgPayload);
          } 
        } catch (e) {
          setErrors(true);
        }
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
        image = {image}
      />
    </main>
  );
}