import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import SidebarDialogue from "../components/SidebarDialogue";
//import "./Home.css";

export default function Plato() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writing, setWriting] = useState([]);

  const queryStr = "person?slug=plato&_fields=title,content,writing";

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
          setWriting(payload[0].writing);
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
        <Col md={1}></Col>
        <Col md={7}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Col>
        <Col md={3}>
          <div className="p-3 mb-3 bg-light rounded">
            <h4 className="font-italic">Atlantis dialogues</h4>
          </div>
          {writing.map((item, index) => 
            <SidebarDialogue
              key = {index}
              title = {item.post_title}
              text = {item.post_excerpt}
              link = {"/source/" + item.post_name}
              linkText = "Go to dialogue">
            </SidebarDialogue>
          )}
        </Col>
        <Col md={1}></Col>
      </Row>
	  </main>
  );
}