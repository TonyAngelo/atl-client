import React, { useState, useEffect } from "react";
import { Row, Col, ResponsiveEmbed } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import { xmlParse } from "../libs/xml-parse";
import { cdnRewrite } from "../libs/cdn-rewrite";
import SidebarPost from "../components/SidebarPost";
//import "./Home.css";

export default function Source(props) {
  const [source, setSource] = useState([]);

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
  }, [queryStr]);

  return (
    <main>
      {source.length > 0
        ? <div><Row className="my-4 text-center">
            <Col>
              <h1 className="my-2">{xmlParse(source[0].title.rendered)}</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <Row className="mb-2">
                <Col>
                  <div className="html-content" dangerouslySetInnerHTML={{ __html: source[0].content.rendered }} />
                </Col>
              </Row>
              {source[0].attachment
                ? <Row className="my-4">
                    <Col>
                      <div className="my-2" style={{ width: '100%', height: 'auto' }}>
                        <ResponsiveEmbed aspectRatio="1by1">
                          <embed type={source[0].attachment.post_mime_type} src={cdnRewrite(source[0].attachment.guid)} />
                        </ResponsiveEmbed>
                      </div>
                      <a href={cdnRewrite(source[0].attachment.guid)}>link to pdf</a>
                    </Col>
                  </Row>
                : <Row className="mb-4">
                    <Col>
                      {source[0].source_free === "1"
                        ? <a href={source[0].source_link}>link to source</a>
                        : <a href={source[0].source_link}>purchase link</a>
                      }
                    </Col>
                  </Row>
              }
            </Col>
            <Col lg={4}>
              {source[0].source_person
                ? <div><div className="p-3 mb-3 bg-light rounded">
                    <h4 className="font-italic">Related Author</h4>
                  </div>
                  <SidebarPost
                    title = {source[0].source_person[0].post_title}
                    text = {source[0].source_person[0].post_excerpt}
                    link = {"/people/" + source[0].source_person[0].post_name}
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
          </Row></div>
        : null
      }
    </main>
  );
}