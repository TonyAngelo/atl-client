import React from "react";
import { Row, Col, Figure } from 'react-bootstrap';
import { cdnRewrite } from "../libs/cdn-rewrite";

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
    <Row>
      <Col className="d-none d-lg-block" lg={2}></Col>
      <Col lg={8}>
        {data['_embedded']['wp:featuredmedia'].length > 0
          ? <Figure className="mt-2">
              <Figure.Image src={cdnRewrite(data['_embedded']['wp:featuredmedia'][0]['source_url'])} fluid rounded />
              <Figure.Caption>{data['_embedded']['wp:featuredmedia'][0]['alt_text']}</Figure.Caption>
            </Figure>
          : null
        }
        <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
      </Col>
      <Col className="d-none d-lg-block" lg={2}></Col>
    </Row>
  );
}