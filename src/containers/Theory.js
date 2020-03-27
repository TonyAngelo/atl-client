import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import { xmlParse } from "../libs/xml-parse";
import SidebarPost from "../components/SidebarPost";
//import "./Home.css";

export default function Theory(props) {
  const [theory, setTheory] = useState([]);

  const queryStr = `theory?slug=${props.match.params.theory}`;
  //'https://cdn.' + source[0].attachment.guid.substring(source[0].attachment.guid.search('api.')+4)
  useEffect(() => {
    async function onLoad() {
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload);
          setTheory(payload);
        } 
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [queryStr]);

  return (
    <main>
      {theory.length > 0
        ? <div><Row className="my-4 text-center">
            <Col>
              <h1 className="my-2">{xmlParse(theory[0].title.rendered)}</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <Row className="mb-2">
                <Col>
                  <div className="html-content" dangerouslySetInnerHTML={{ __html: xmlParse(theory[0].content.rendered) }} />
                </Col>
              </Row>
            </Col>
            <Col lg={4}>
              <div className="p-3 mb-3 bg-light rounded">
                <h4 className="font-italic">{theory[0].sources.length > 1 ? "Related Sources" : "Related Source"}</h4>
              </div>
              {theory[0].sources.map((item, index) =>
                <SidebarPost
                  key = {index}
                  title = {item.post_title}
                  text = {item.post_excerpt}
                  link = {"/source/" + item.post_name}
                  linkText = "Go to page">
                </SidebarPost>
              )}
            </Col>
          </Row></div>
        : null
      }
    </main>
  );
}