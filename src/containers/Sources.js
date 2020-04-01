import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import PageTitle from "../components/PageTitle";
import TiledPostPage from "../components/TiledPostPage";
//import "./Home.css";

export default function Sources(props) {
  const [data, setData] = useState([]);
  let queryStr = "source?&order=asc&page=1&per_page=100&_embed&_fields=title,excerpt,slug";

  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
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
      props.setIsLoaded(true);
    }

    onLoad();
  }, [queryStr]);

  return (
    <main>
      <PageTitle loaded={props.isLoaded}>Sources</PageTitle>
      <TiledPostPage
        path = "sources"
        data = {data}
      />
    </main>
  );
}