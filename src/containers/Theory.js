import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import MyAlert from "../components/Alert";
import PageTitle from "../components/PageTitle";
import BlogSection from "../components/BlogSection";
import SidebarSection from "../components/SidebarSection";
//import SocialShare from "../components/SocialShare";
import TheoryMap from "../components/TheoryMap";
//import "./Home.css";

export default function Theory(props) {
  const [data, setData] = useState([]);
  //const [people, setPeople] = useState(false);
  const [sources, setSources] = useState(false);
  const [posts, setPosts] = useState(false);
  const [errors, setErrors] = useState(false);
  
  useEffect(() => {
    async function onLoad() {
      let payload = [];
      let response = "";
      let postIDs = [];
      let sourceIDs = [];
      //let peopleIDs = [];
      let queryStr = `theory?slug=${props.match.params.theory}`;
      let postStr = `posts?_fields=title,excerpt,slug,date&include=`;
      let sourceStr = `source?_fields=title,excerpt,slug,date&page=1&per_page=100&include=`;
      //let personStr = `person?_fields=title,excerpt,slug,date&include=`;

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
        setErrors(true);
      }
      props.setIsLoaded(true);

      if(payload[0].theory_posts) {
        postStr = postStr + payload[0].theory_posts;
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

      if(payload[0].theory_sources) {
        sourceStr = sourceStr + payload[0].theory_sources;
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
  }, [props.location.pathname]);

  return (
    <main>
      <StandardHelmet 
        title={data.length > 0 ? data[0].title.rendered : ""}
        link={"https://atlantis.fyi/theories/" + props.match.params.theory} 
      />
      <MyAlert show={errors} text="Page loaded with error(s)" />
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