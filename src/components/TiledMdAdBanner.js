import React from "react";
import { Row, Col, Image } from 'react-bootstrap';

export default function TiledMdAdBanner({
  className = "",
  disabled = false,
  ...props
}) {
  if(disabled) {
    return null;
  }
  
  return (
    <div>
      <Row className="d-none d-md-block d-lg-none">
        <Col>
          <Image className="mb-4" fluid src="https://via.placeholder.com/1000x150" />
        </Col>
      </Row>
      <Row className="d-block d-md-none">
        <Col>
          <Image className="mb-4" fluid src="https://via.placeholder.com/800x100" />
        </Col>
      </Row>
    </div>
  );
}