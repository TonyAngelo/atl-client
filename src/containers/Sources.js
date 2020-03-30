import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import TiledPostPage from "../components/TiledPostPage";
//import "./Home.css";

export default function Sources() {
  const [data, setData] = useState([]);
  let queryStr = "source?&order=asc&page=1&per_page=100&_embed";

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
      title = "Sources"
      path = "sources"
      data = {data}
    />
  );
}