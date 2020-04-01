import React from "react";
import { Row, Col } from "react-bootstrap";
import FeaturedImage from "../components/FeaturedImage";
import BlogContent from "../components/BlogContent";
import BlogMeta from "../components/BlogMeta";
import BlogFooter from "../components/BlogFooter";
//import "./PageTitle.css";

export default function BlogSection({
  isLoading,
  className = "",
  disabled = false,
  data = {},
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
          <BlogMeta 
            date={data.date}
            edited={data.modified}
            author="Tony Petrangelo"
          />
          <BlogContent>{data.content.rendered}</BlogContent>
          <BlogFooter 
            category={data['_embedded']['wp:term'][0][0]}
            tags={data['_embedded']['wp:term'][1]}
          />
        </Col>
      </Row>
  );
}