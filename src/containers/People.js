import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import TiledPostPage from "../components/TiledPostPage";
//import "./Home.css";

export default function People() {
  const [people, setPeople] = useState([]);

  const queryStr = "person?&order=asc&page=1&per_page=100&exclude=100&_fields=title,excerpt,slug";

  useEffect(() => {
    async function onLoad() {
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          setPeople(payload);
        } 
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, []);

  return (
    <TiledPostPage
      title = "People"
      path = "people"
      data = {people}
    />
  );
}