import React from "react";
import { Row, Col } from "react-bootstrap";
import { xmlParse } from "../libs/xml-parse";
import FeaturedImage from "../components/FeaturedImage";
import BlogContent from "../components/BlogContent";
import BlogMeta from "../components/BlogMeta";
import BlogFooter from "../components/BlogFooter";
//import "./PageTitle.css";

export default function BlogSection({
  isLoading,
  className = "",
  disabled = false,
  meta = true,
  data = {},
  image = {},
  cats = [],
  tags = [],
  ...props
}) {
  if(disabled || isLoading) {
    return null;
  }
  return (
      <Row className="mb-2">
        <Col>
          {image['media_details']
            ? <FeaturedImage 
                url={image['media_details']['sizes']['medium_large']['source_url']}
                caption={image['caption']['rendered']}
              />
            : null
          }
          {meta
            ? <BlogMeta 
                date={data.date}
                author="Tony Petrangelo"
              />
            : null
          }
          <BlogContent>{data.content.rendered}</BlogContent>
          {meta
            ? <BlogFooter 
                data={data}
                meta={meta}
                title={xmlParse(data.title.rendered)}
                category={meta ? cats : null}
                tags={meta ? tags : null}
              />
            : null
          }
        </Col>
      </Row>
  );
}