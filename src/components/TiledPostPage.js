import React from "react";
import { Row, Col } from 'react-bootstrap';
import { xmlParse } from "../libs/xml-parse";
import TiledPost from "../components/TiledPost";

export default function TiledPostPage({
  className = "",
  disabled = false,
  path = "",
  data = [],
  meta = false,
  ...props
}) {
  if(disabled) {
    return null;
  }
  
  return (
        <Row>
          {data.length > 0
            ? data.map((item, index) =>
                <Col key = {index} md={6} lg={4}>
                  {meta
                    ? <TiledPost
                        title = {item.title.rendered}
                        text = {item.excerpt.rendered}
                        link = {"/" + path + "/" + item.slug}
                        date = {item.date}
                        author = {item.source_author}
                      />
                    : <TiledPost
                        title = {item.title.rendered}
                        text = {item.excerpt.rendered}
                        link = {"/" + path + "/" + item.slug}
                      />
                  }
                </Col>
              )
            : null
          }
        </Row>
  );
}