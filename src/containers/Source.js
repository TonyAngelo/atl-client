import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import SidebarPost from "../components/SidebarPost";
//import "./Home.css";

export default function Source(props) {
  const [source, setSource] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const queryStr = `source?slug=${props.match.params.source}`;
  //'https://cdn.' + source[0].attachment.guid.substring(source[0].attachment.guid.search('api.')+4)
  useEffect(() => {
    async function onLoad() {
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload);
          setSource(payload);
        } 
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, []);

  return (
    <main>
      {source.length > 0
        ? <div><Row className="my-4 text-center">
            <Col>
              <h1 className="my-2">{source[0].title.rendered}</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={1}></Col>
            <Col lg={7}>
              <Row className="mb-2">
                <Col>
                  <div className="html-content" dangerouslySetInnerHTML={{ __html: source[0].content.rendered }} />
                </Col>
              </Row>
              {source[0].attachment
                ? <Row className="my-4">
                    <Col>
                      <div className="mb-2">
                        <object width="100%" height="950px" data={'https://cdn.' + source[0].attachment.guid.substring(source[0].attachment.guid.search('api.')+4)} type="application/pdf"> 
                          <p>It appears you don't have a PDF plugin for this browser.
                           No biggie... you can <a href="resume.pdf">click here to
                          download the PDF file.</a></p>  
                        </object>
                      </div>
                      <div className="text-center">
                        <a href={'https://cdn.' + source[0].attachment.guid.substring(source[0].attachment.guid.search('api.')+4)}>
                          link to pdf file</a>
                      </div>
                    </Col>
                  </Row>
                : null
              }
            </Col>
            <Col lg={3}>
              {source[0].source_person
                ? <div><div className="p-3 mb-3 bg-light rounded">
                    <h4 className="font-italic">Related Author</h4>
                  </div>
                  <SidebarPost
                    title = {source[0].source_person[0].post_title}
                    text = {source[0].source_person[0].post_excerpt}
                    link = {"/person/" + source[0].source_person[0].post_name}
                    linkText = "Go to page">
                  </SidebarPost></div>
                : null
              }
              {source[0].source_theory
                ? <div><div className="p-3 mb-3 bg-light rounded">
                    <h4 className="font-italic">Related Theory</h4>
                  </div><SidebarPost
                    title = {source[0].source_theory[0].post_title}
                    text = {source[0].source_theory[0].post_excerpt}
                    link = {"/theory/" + source[0].source_theory[0].post_name}
                    linkText = "Go to page">
                  </SidebarPost></div>
                : null
              }
            </Col>
            <Col lg={1}></Col>
          </Row></div>
        : null
      }
    </main>
  );
}