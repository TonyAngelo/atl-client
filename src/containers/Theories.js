import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import TiledPostPage from "../components/TiledPostPage";
// import TiledMdAdBanner from "../components/TiledMdAdBanner";
// import TiledSideAdBanner from "../components/TiledSideAdBanner";
//import "./Home.css";

export default function Theories() {
  const [theories, setTheories] = useState([]);

  const queryStr = "theory?&_fields=title,excerpt,slug";

  useEffect(() => {
    async function onLoad() {
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          setTheories(payload);
        } 
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, []);

  return (
    <TiledPostPage
      title = "Theories"
      path = "theory"
      data = {theories}
    ></TiledPostPage>
  );
}