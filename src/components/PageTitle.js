import React from "react";
import { Row, Col } from "react-bootstrap";
//import "./PageTitle.css";

export default function PageTitle({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  if(disabled || isLoading) {
    return null;
  }
  return (
    <Row className={`my-4 text-center ${className}`}>
      <Col>
        <h1 dangerouslySetInnerHTML={{ __html: props.children }} />
      </Col>
    </Row>
  );
}