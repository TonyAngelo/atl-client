import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import TiledPostPage from "../components/TiledPostPage";
//import "./Home.css";

export default function Sources() {
  const [sources, setSources] = useState([]);

  const queryStr = "source?&order=asc&page=1&per_page=100&_fields=title,excerpt,slug";

  useEffect(() => {
    async function onLoad() {
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload);
          setSources(payload);
        } 
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, []);

  return (
    <TiledPostPage
      title = "Sources"
      path = "sources"
      data = {sources}
    />
  );
}