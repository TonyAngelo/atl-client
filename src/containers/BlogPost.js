import React, { useState, useEffect } from "react";
import { Row, Col, Figure } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import { defaultDescription } from "../libs/seo";
import {Helmet} from "react-helmet";
import PageTitle from "../components/PageTitle";
import BlogSection from "../components/BlogSection";
import FeaturedImage from "../components/FeaturedImage";
import BlogContent from "../components/BlogContent";
import SidebarSection from "../components/SidebarSection";
//import "./Home.css";

export default function BlogPost(props) {
  const [data, setData] = useState([]);
  let queryStr = `posts?slug=${props.match.params.post}&_embed`;
  
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
      <Helmet>
        <title>{data.length > 0 ? data[0].title.rendered : ""} | Atlantis FYI</title>
        <link rel="canonical" href={"https://atlantis.fyi/blog/" + props.match.params.post} />
        <meta name="description" content={defaultDescription} />
      </Helmet>
      <PageTitle loaded={props.isLoaded}>{data.length > 0 ? data[0].title.rendered : ""}</PageTitle>
      {data.length > 0
        ? <Row>
            <Col lg={8}>
              <BlogSection
                data={data[0]}
              />
            </Col>
            <Col lg={4}>
              {data[0].post_theories
                ? <SidebarSection
                    data = {data[0].post_theories}
                    titleSingle = "Theory"
                    titleMultiple = "Theories"
                  />
                : null
              }
              {data[0].post_sources
                ? <SidebarSection
                    data = {data[0].post_sources}
                    titleSingle = "Source"
                    titleMultiple = "Sources"
                  />
                : null
              }
              {data[0].post_people
                ? <SidebarSection
                    data = {data[0].post_people}
                    titleSingle = "Person"
                    titleMultiple = "People"
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