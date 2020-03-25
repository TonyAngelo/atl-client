import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import SidebarDialogue from "../components/SidebarDialogue";
import TiledMdAdBanner from "../components/TiledMdAdBanner";
import RegularSideAdBanner from "../components/RegularSideAdBanner";
//import "./Home.css";

export default function Plato() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writing, setWriting] = useState([]);
  const [atlantis, setAtlantis]= useState([]);

  const queryStr = "person?slug=plato&_fields=title,content,writing";

  useEffect(() => {
    async function onLoad() {
      let atlItems = [];
      let otherItems = [];
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload)
          setTitle(payload[0].title.rendered);
          setContent(payload[0].content.rendered);
          payload[0].writing.map(function(item, index) {
            if(item.post_name === "critias" || item.post_name === "timaeus") {
              atlItems.push(item);
            } else {
              otherItems.push(item);
            }
          });
          setAtlantis(atlItems);
          setWriting(otherItems);
        } 
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, []);

  return (
    <main>
      <Row className="my-4 text-center">
        <Col>
          <h1 className="my-2">{title}</h1>
        </Col>
	    </Row>
      <Row>
        <Col className="d-none d-lg-block" lg={1}></Col>
        <Col md={8} lg={7}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Col>
        <Col className="d-none d-lg-block" lg={1}></Col>
        <Col md={4} lg={3}>
          <TiledMdAdBanner></TiledMdAdBanner>
          <div className="p-3 mb-3 bg-light rounded">
            <h4 className="font-italic">Atlantis dialogues</h4>
          </div>
          {atlantis.map((item, index) => 
            <SidebarDialogue
              key = {index}
              title = {item.post_title}
              text = {item.post_excerpt}
              link = {"/source/" + item.post_name}
              linkText = "Go to dialogue">
            </SidebarDialogue>
          )}
          <TiledMdAdBanner></TiledMdAdBanner>
          <div className="p-3 mb-3 bg-light rounded">
            <h4 className="font-italic">Related Sources</h4>
          </div>
          {writing.map((item, index) => 
            <SidebarDialogue
              key = {index}
              title = {item.post_title}
              text = {item.post_excerpt}
              link = {"/source/" + item.post_name}
              linkText = "Go to source">
            </SidebarDialogue>
          )}
        </Col>
      </Row>
      <TiledMdAdBanner></TiledMdAdBanner>
	  </main>
  );
}