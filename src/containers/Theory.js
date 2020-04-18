import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import { defaultDescription } from "../libs/seo";
import {Helmet} from "react-helmet";
import PageTitle from "../components/PageTitle";
import BlogSection from "../components/BlogSection";
import SidebarSection from "../components/SidebarSection";
import SocialShare from "../components/SocialShare";
import TheoryMap from "../components/TheoryMap";
//import "./Home.css";

export default function Theory(props) {
  const [data, setData] = useState([]);
  let queryStr = `theory?_embed&slug=${props.match.params.theory}`;
  
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
        <link rel="canonical" href={"https://atlantis.fyi/theories/" + props.match.params.theory} />
        <meta name="description" content={defaultDescription} />
      </Helmet>
      <PageTitle loaded={props.isLoaded}>{data.length > 0 ? data[0].title.rendered : ""}</PageTitle>
      {data.length > 0
        ? <Row>
            <Col lg={8}>
              {data[0].theory_latitude.length > 0 && data[0].theory_longitude.length > 0
                ? <TheoryMap 
                    lat={parseFloat(data[0].theory_latitude)}
                    lng={parseFloat(data[0].theory_longitude)}
                    zoom={parseFloat(data[0].theory_zoom)}
                  />
                : null
              }
              <BlogSection
                data={data[0]}
                meta={false}
              />
            </Col>
            <Col lg={4}>
              {data[0].theory_sources
                ? <SidebarSection
                    data = {data[0].theory_sources}
                    titleSingle = "Source"
                    titleMultiple = "Sources"
                  />
                : null
              }
              {data[0].theory_posts
                ? <SidebarSection
                    data = {data[0].theory_posts}
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