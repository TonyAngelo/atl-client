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
    <Row className={`pageTitle ${className}`}>
      <Col>
        <h1>{props.children}</h1>
      </Col>
    </Row>
  );
}