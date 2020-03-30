import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import TiledPostPage from "../components/TiledPostPage";
//import "./Home.css";

export default function Theories() {
  const [data, setData] = useState([]);
  let queryStr = "theory?_embed&order=asc&page=1&per_page=100";

  useEffect(() => {
    async function onLoad() {
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload);
          setData(payload);
        } 
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [queryStr]);

  return (
    <TiledPostPage
      title = "Theories"
      path = "theories"
      data = {data}
    />
  );
}