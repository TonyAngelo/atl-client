import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
//import "./Home.css";

export default function Contact() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const queryStr = "pages?slug=contact&_fields=title,content,date";

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
    <main>
      <Row className="my-4 text-center">
        <Col>
          <h1 className="my-2">{title}</h1>
        </Col>
	    </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Col>
        <Col md={3}></Col>
      </Row>
	  </main>
  );
}