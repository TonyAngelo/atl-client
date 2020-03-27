import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import { xmlParse } from "../libs/xml-parse";
import SidebarPost from "../components/SidebarPost";
//import "./Home.css";

export default function Person(props) {
  const [person, setPerson] = useState([]);

  const queryStr = `person?slug=${props.match.params.person}`;
  //'https://cdn.' + source[0].attachment.guid.substring(source[0].attachment.guid.search('api.')+4)
  useEffect(() => {
    async function onLoad() {
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload);
          setPerson(payload);
        } 
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [queryStr]);

  return (
    <main>
      {person.length > 0
        ? <div><Row className="my-4 text-center">
            <Col>
              <h1 className="my-2">{xmlParse(person[0].title.rendered)}</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <Row className="mb-2">
                <Col>
                  <div className="html-content" dangerouslySetInnerHTML={{ __html: xmlParse(person[0].content.rendered) }} />
                </Col>
              </Row>
            </Col>
            <Col lg={4}>
              <div className="p-3 mb-3 bg-light rounded">
                <h4 className="font-italic">{person[0].writing.length > 1 ? "Related Sources" : "Related Source"}</h4>
              </div>
              {person[0].writing.map((item, index) =>
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