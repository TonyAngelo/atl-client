import React, { useState, useEffect } from "react";
import StandardHelmet from "../components/StandardHelmet";
import { LinkContainer } from 'react-router-bootstrap'
import { apiHeader } from "../libs/api";
import { Row, Col, Button } from 'react-bootstrap';
import TiledPost from "../components/TiledPost";
//import "./Home.css";

export default function FinderReal(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sources, setSources] = useState([]);

  const queryStr = "question?slug=was-atlantis-real";

  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
      //get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload)
          setTitle(payload[0].title.rendered);
          setContent(payload[0].content.rendered);
          setSources(payload[0].question_sources);
        } 
      } catch (e) {
        alert(e);
      }
      props.setIsLoaded(true);
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
      <Row className="my-4">
        <Col>
          <h3 className="my-2">{title}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="html-content" dangerouslySetInnerHTML={{ __html: content }} />
        </Col>
      </Row>
      <Row>
      {sources.length > 0
        ? sources.map((item, index) => 
            <Col key={index} md={4}>
              <TiledPost
                title = {item.post_title}
                text = {item.post_excerpt}
                link = {"/source/" + item.post_name}
              />
            </Col>
          )
        : null
      }
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
    </main>
  );
}