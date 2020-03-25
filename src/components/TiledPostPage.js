import React from "react";
import { Row, Col } from 'react-bootstrap';
import { xmlParse } from "../libs/xml-parse";
import TiledPost from "../components/TiledPost";
import TiledMdAdBanner from "../components/TiledMdAdBanner";
import TiledSideAdBanner from "../components/TiledSideAdBanner";

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
        <Col lg={10}>
          <Row>
            {data.length > 0
              ? data.map((item, index) =>
                  <Col key = {index} md={6}>
                    {index === 1 || (index > 0 && index % 5 === 0) ? <TiledMdAdBanner></TiledMdAdBanner> : null}
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
        <TiledSideAdBanner></TiledSideAdBanner>
      </Row>
      <TiledMdAdBanner></TiledMdAdBanner>
    </main>
  );
}