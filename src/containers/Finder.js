import React, { useState, useEffect } from "react";
import { apiHeader } from "../libs/api";
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Button } from 'react-bootstrap';
import TiledPost from "../components/TiledPost";
//import "./Home.css";

export default function Finder() {
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
      <Row className="my-4 text-center">
        <Col>
          <h1 className="my-2">Atlantis Finder</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Welcome to the Atlantis finder, a step-by-step guide to help you begin your search for Atlantis.</p>
          <p>Before getting started you may find it helpful to review the original source material for the story of Atlantis as well as the other assorted introductory materials linked below.</p>
          <p>Press the "Ready To Go" button to begin your search.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <TiledPost
            title = ""
            text = ""
            link = {""}
          />
        </Col>
      </Row>
      <Row>
        <Col md={3} className="d-none d-md-block">
          <p></p>
        </Col>
        <Col md={6}>
          <LinkContainer to="/finder/real">
            <Button className="my-4" block>Ready To Go</Button>
          </LinkContainer>
        </Col>
        <Col md={3} className="d-none d-md-block">
          <p></p>
        </Col>
      </Row>
    </main>
  );
}