import React, { useState, useEffect } from "react";
import { Row, Col, Figure } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import PageTitle from "../components/PageTitle";
import BlogSection from "../components/BlogSection";
import SidebarSection from "../components/SidebarSection";
import SocialShare from "../components/SocialShare";
//import "./Home.css";

export default function Person(props) {
  const [data, setData] = useState([]);
  let queryStr = `person?&_embed&slug=${props.match.params.person}`;

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
      <StandardHelmet 
        title={data.length > 0 ? data[0].title.rendered : ""}
        link={"https://atlantis.fyi/people/" + props.match.params.person} 
      />
      <PageTitle loaded={props.isLoaded}>{data.length > 0 ? data[0].title.rendered : ""}</PageTitle>
      {data.length > 0
        ? <Row>
            <Col lg={8}>
              <BlogSection
                meta={false}
                data={data[0]}
              />
            </Col>
            <Col lg={4}>
              {data[0].writing
                ? <SidebarSection
                    data = {data[0].writing}
                    titleSingle = "Source"
                    titleMultiple = "Sources"
                  />
                : null
              }
              {data[0].person_posts
                ? <SidebarSection
                    data = {data[0].person_posts}
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