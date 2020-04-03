import React, { useState, useEffect } from "react";
import { Row, Col, ResponsiveEmbed, Button } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import { xmlParse } from "../libs/xml-parse";
import { cdnRewrite } from "../libs/cdn-rewrite";
import PageTitle from "../components/PageTitle";
import BlogSection from "../components/BlogSection";
import SidebarSection from "../components/SidebarSection";
import SocialShare from "../components/SocialShare";
//import "./Home.css";

export default function Source(props) {
  const [data, setData] = useState([]);
  let queryStr = `source?_embed&slug=${props.match.params.source}`;
  
  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload);
          setData(payload);
        } 
      } catch (e) {
        alert(e);
      }
      props.setIsLoaded(true);
    }

    onLoad();
  }, [queryStr]);

  return (
    <main>
      <PageTitle loaded={props.isLoaded}>{data.length > 0 ? data[0].title.rendered : ""}</PageTitle>
      {data.length > 0
        ? <Row>
            <Col lg={8}>
              <Row className="mb-4">
                <Col>
                  <Button variant="secondary" size="lg" href={data[0].source_link}>Get this source</Button>
                </Col>
              </Row>
              <BlogSection
                meta={false}
                data={data[0]}
              />
              {data[0].attachment
              ? <Row className="my-4">
                  <Col>
                    <div className="my-2" style={{ width: '100%', height: 'auto' }}>
                      <ResponsiveEmbed aspectRatio="1by1">
                        <embed type={data[0].attachment.post_mime_type} src={cdnRewrite(data[0].attachment.guid)} />
                      </ResponsiveEmbed>
                    </div>
                    <a href={cdnRewrite(data[0].attachment.guid)}>link to pdf</a>
                  </Col>
                </Row>
              : null
            }
            </Col>
            <Col lg={4}>
              {data[0].source_person
                ? <SidebarSection
                    data = {data[0].source_person}
                    titleSingle = "Person"
                    titleMultiple = "People"
                  />
                : null
              }
              {data[0].source_theory
                ? <SidebarSection
                    data = {data[0].source_theory}
                    titleSingle = "Theory"
                    titleMultiple = "Theories"
                  />
                : null
              }
              {data[0].source_posts
                ? <SidebarSection
                    data = {data[0].source_posts}
                    titleSingle = "Post"
                    titleMultiple = "Posts"
                    linkPath = "blog"
                  />
                : null
              }
            </Col>
          </Row>
        : null
      }
    </main>
  );
}