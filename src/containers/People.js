import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import PageTitle from "../components/PageTitle";
import TiledPostPage from "../components/TiledPostPage";
//import "./Home.css";

export default function People(props) {
  const [data, setData] = useState([]);
  //const [page, setPage] = useState(1);
  //const [pages, setPages] = useState(24);

  const page = 1;
  const pages = 100;
  let queryStr = `person?&order=asc&page=${page}&per_page=${pages}&exclude=100&_embed`;

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
        title={"People"}
        link={"https://atlantis.fyi/people"} 
      />
      <PageTitle loaded={props.isLoaded}>People</PageTitle>
      <TiledPostPage
        path = "people"
        data = {data}
      />
    </main>
  );
}