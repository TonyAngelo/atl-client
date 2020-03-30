import React from "react";
import { Row, Col, Figure } from 'react-bootstrap';
import { cdnRewrite } from "../libs/cdn-rewrite";
import PageTitle from "../components/PageTitle";

export default function RegularPage({
  className = "",
  disabled = false,
  data = {},
  ...props
}) {
  if(disabled) {
    return null;
  }

  if(Object.keys(data).length === 0) { return null; }
  
  return (
    <main>
      {data['_embedded']['wp:featuredmedia'].length > 0
        ? <Figure className="mt-2">
            <Figure.Image src={cdnRewrite(data['_embedded']['wp:featuredmedia'][0]['source_url'])} fluid rounded />
            <Figure.Caption>{data['_embedded']['wp:featuredmedia'][0]['alt_text']}</Figure.Caption>
          </Figure>
        : null
      }
      <PageTitle>{data.title.rendered}</PageTitle>
      <Row>
        <Col className="d-none d-lg-block" lg={1}></Col>
        <Col lg={10}>
          <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </Col>
        <Col className="d-none d-lg-block" lg={1}></Col>
      </Row>
    </main>
  );
}