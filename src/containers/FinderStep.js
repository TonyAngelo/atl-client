import React, { useState, useEffect } from "react";
import StandardHelmet from "../components/StandardHelmet";
import { LinkContainer } from 'react-router-bootstrap'
import { apiHeader } from "../libs/api";
import { Row, Col, Button } from 'react-bootstrap';
//import "./Home.css";

export default function FinderStep() {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  // const queryStr = "pages?slug=contact&_fields=title,content,date";

  useEffect(() => {
    async function onLoad() {
      // get page content
      // try {
      //   const response = await fetch(apiHeader + queryStr);
      //   if (response.ok) { // ckeck if status code is 200
      //     const payload = await response.json();
      //     console.log(payload)
      //     setTitle(payload[0].title.rendered);
      //     setContent(payload[0].content.rendered);
      //   } 
      // } catch (e) {
      //   alert(e);
      // }
    }

    onLoad();
  }, []);

  return (
    <main>
      <StandardHelmet 
        title={"Finder"}
        link={"https://atlantis.fyi/finder"} 
      />
      <Row className="my-4 text-center">
        <Col>
          <h1 className="my-2">Atlantis Finder</h1>
        </Col>
      </Row>
      <Row className="my-4 text-center">
        <Col>
          <h2 className="my-2">Was Atlantis a true story or not?</h2>
        </Col>
      </Row>
      <Row>
        <Col md={2} className="d-none d-md-block">
          <p></p>
        </Col>
        <Col md={3}>
          <LinkContainer to="/finder/when">
            <Button className="m-4" block>True Story</Button>
          </LinkContainer>
        </Col>
        <Col md={2} className="d-none d-md-block">
          <p></p>
        </Col>
        <Col md={3}>
          <LinkContainer to="/finder/meaning">
            <Button className="m-4" block>Made-up Story</Button>
          </LinkContainer>
        </Col>
        <Col md={2} className="d-none d-md-block">
          <p></p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <p>---content from cms---</p>
        </Col>
      </Row>
    </main>
  );
}