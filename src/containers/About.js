import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import RegularPage from "../components/RegularPage";
//import "./Home.css";

export default function About() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const queryStr = "pages?slug=about&_fields=title,content,date";

  useEffect(() => {
    async function onLoad() {
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload)
          setTitle(payload[0].title.rendered);
          setContent(payload[0].content.rendered);
        } 
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, []);

  return (
    <RegularPage
      title = {title}
      content = {content}
    ></RegularPage>
  );
}