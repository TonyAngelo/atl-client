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
  const [theories, setTheories] = useState(false);
  const [sources, setSources] = useState(false);
  const [posts, setPosts] = useState(false);
  const [image, setImage] = useState({});

  let queryStr = `person?slug=${props.match.params.person}`;
  let postStr = `posts?_fields=title,excerpt,slug,date&include=`;
  //let theoryStr = `theory?_fields=title,excerpt,slug,date&include=`;
  let sourceStr = `source?_fields=title,excerpt,slug,date&page=1&per_page=100&include=`;

  useEffect(() => {
    async function onLoad() {
      let payload = [];
      let response = "";
      let imageLink = "";
      let postIDs = [];
      //let theoryIDs = [];
      let sourceIDs = [];

      props.setIsLoaded(false);
      // get page content
      try {
        response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          //console.log(payload);
          setData(payload);
        } 
      } catch (e) {
        alert(e);
      }
      props.setIsLoaded(true);
      imageLink = payload[0]._links['wp:featuredmedia'][0].href;

      try {
        response = await fetch(imageLink);
        if (response.ok) { // ckeck if status code is 200
          const imgPayload = await response.json();
          //console.log(payload);
          setImage(imgPayload);
        } 
      } catch (e) {
        alert(e);
      }

      if(payload[0].person_posts) {
        postStr = postStr + payload[0].person_posts;
        try {
          response = await fetch(apiHeader + postStr);
          if (response.ok) { // ckeck if status code is 200
            postIDs = await response.json();
            //console.log(theoryIDs);
            setPosts(postIDs);
          } 
        } catch (e) {
          alert(e);
        }
      }

      if(payload[0].writing) {
        sourceStr = sourceStr + payload[0].writing;
        try {
          response = await fetch(apiHeader + sourceStr);
          if (response.ok) { // ckeck if status code is 200
            sourceIDs = await response.json();
            //console.log(theoryIDs);
            setSources(sourceIDs);
          } 
        } catch (e) {
          alert(e);
        }
      }
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
                image={image}
                data={data[0]}
              />
            </Col>
            <Col lg={4}>
              {sources
                ? <SidebarSection
                    data = {sources}
                    titleSingle = "Source"
                    titleMultiple = "Sources"
                  />
                : null
              }
              {posts
                ? <SidebarSection
                    data = {posts}
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