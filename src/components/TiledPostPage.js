import React from "react";
import { Row, Col } from 'react-bootstrap';
import { xmlParse } from "../libs/xml-parse";
import PageTitle from "../components/PageTitle";
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
      <PageTitle>{title}</PageTitle>
      <Row>
        <Col>
          <Row>
            {data.length > 0
              ? data.map((item, index) =>
                  <Col key = {index} md={6} lg={4}>
                    <TiledPost
                      title = {item.title.rendered}
                      text = {item.excerpt.rendered}
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