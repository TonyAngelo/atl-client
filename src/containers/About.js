import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import RegularPage from "../components/RegularPage";
import { cdnRewrite } from "../libs/cdn-rewrite";
//import "./Home.css";

export default function About() {
  const [data, setData] = useState({});
  const queryStr = "pages?slug=about&_embed";

  useEffect(() => {
    async function onLoad() {
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
    }

    onLoad();
  }, []);

  return (
    <RegularPage
      data = {data}
    />
  );
}