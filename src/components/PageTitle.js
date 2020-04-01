import React from "react";
import { Row, Col } from "react-bootstrap";
//import "./PageTitle.css";

export default function PageTitle({
  isLoading,
  className = "",
  disabled = false,
  loaded = false,
  ...props
}) {
  if(disabled || isLoading) {
    return null;
  }
  if(loaded === false) {
    return (
      <div className="mt-4 d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
  return (
    <Row className={`my-4 text-center ${className}`}>
      <Col>
        <h1 dangerouslySetInnerHTML={{ __html: props.children }} />
      </Col>
    </Row>
  );
}