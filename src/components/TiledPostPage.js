import React from "react";
import { Row, Col } from 'react-bootstrap';
import { xmlParse } from "../libs/xml-parse";
import TiledPost from "../components/TiledPost";

export default function TiledPostPage({
  className = "",
  disabled = false,
  title = "",
  path = "",
  data = [],
  ...props
}) {
  if(disabled) {
    return null;
  }
  
  return (
    <main>
      <Row className="my-4 text-center">
        <Col>
          <h1 className="my-2">{title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            {data.length > 0
              ? data.map((item, index) =>
                  <Col key = {index} md={6} lg={4}>
                    <TiledPost
                      title = {xmlParse(item.title.rendered)}
                      text = {xmlParse(item.excerpt.rendered)}
                      link = {"/" + path + "/" + item.slug}>
                    </TiledPost>
                  </Col>
                )
              : null
            }
          </Row>
        </Col>
      </Row>
    </main>
  );
}