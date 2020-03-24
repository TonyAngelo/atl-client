import React from "react";
import { Row, Col } from 'react-bootstrap';
import RegularMdAdBanner from "../components/RegularMdAdBanner";
import RegularSideAdBanner from "../components/RegularSideAdBanner";

export default function RegularPage({
  className = "",
  disabled = false,
  title = "",
  content = "",
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
      <RegularMdAdBanner></RegularMdAdBanner>
      <Row>
        <Col md={10}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Col>
        <RegularSideAdBanner></RegularSideAdBanner>
      </Row>
    </main>
  );
}