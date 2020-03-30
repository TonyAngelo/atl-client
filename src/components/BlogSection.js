import React from "react";
import { Row, Col } from "react-bootstrap";
import FeaturedImage from "../components/FeaturedImage";
import BlogContent from "../components/BlogContent";
//import "./PageTitle.css";

export default function BlogSection({
  isLoading,
  className = "",
  disabled = false,
  data = [],
  ...props
}) {
  if(disabled || isLoading) {
    return null;
  }
  return (
      <Row className="mb-2">
        <Col>
          {data['_embedded'] && data['_embedded']['wp:featuredmedia']
            ? <FeaturedImage 
                url={data['_embedded']['wp:featuredmedia'][0]['source_url']}
                caption={data['_embedded']['wp:featuredmedia'][0]['caption']['rendered']}
              />
            : null
          }
          <BlogContent>{data.content.rendered}</BlogContent>
        </Col>
      </Row>
  );
}