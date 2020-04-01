import React, { useState, useEffect } from "react";
import { Row, Col, Figure } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import PageTitle from "../components/PageTitle";
import BlogSection from "../components/BlogSection";
import SidebarSection from "../components/SidebarSection";
//import "./Home.css";

export default function Person(props) {
  const [data, setData] = useState([]);
  let queryStr = `person?&_embed&slug=${props.match.params.person}`;

  useEffect(() => {
    async function onLoad() {
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
    }

    onLoad();
  }, [queryStr]);

  return (
    <main>
      {data.length > 0
        ? <div>
            <PageTitle>{data[0].title.rendered}</PageTitle>
            <Row>
              <Col lg={8}>
                <BlogSection
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
          </div>
        : null
      }
    </main>
  );
}