import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import PageTitle from "../components/PageTitle";
import TiledPostPage from "../components/TiledPostPage";
//import "./Home.css";

export default function Sources(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  //const [pages, setPages] = useState(100);

  const pages = 100;
  let queryStr = `source?&order=asc&page=${page}&per_page=${pages}&_fields=title,excerpt,slug,date,source_author,source_translator`;

  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          //console.log(payload);
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
      <StandardHelmet 
        title={"Sources"}
        link={"https://atlantis.fyi/sources"} 
      />
      <PageTitle loaded={props.isLoaded}>Sources</PageTitle>
      <TiledPostPage
        path = "sources"
        data = {data}
        meta = {true}
      />
    </main>
  );
}