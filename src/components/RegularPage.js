import React from "react";
import { Row, Col, Figure } from 'react-bootstrap';
import FeaturedImage from "../components/FeaturedImage";
import { cdnRewrite } from "../libs/cdn-rewrite";

export default function RegularPage({
  className = "",
  disabled = false,
  data = {},
  image = {},
  ...props
}) {
  if(disabled) {
    return null;
  }

  if(Object.keys(data).length === 0) { return null; }
  console.log(image);
  return (
    <Row>
      <Col className="d-none d-lg-block" lg={2}></Col>
      <Col lg={8}>
        {image['media_details'] && image['media_details']['sizes']['medium_large']
          ? <FeaturedImage 
              url={image['media_details']['sizes']['medium_large']['source_url']}
              caption={image['caption']['rendered']}
            />
          : image['media_details']
            ? <FeaturedImage 
                url={image['media_details']['sizes']['full']['source_url']}
                caption={image['caption']['rendered']}
              />
            : null
        }
        <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
      </Col>
      <Col className="d-none d-lg-block" lg={2}></Col>
    </Row>
  );
}