import React, { useState, useEffect } from "react";
import { Row, Col, ResponsiveEmbed, Button } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import { cdnRewrite } from "../libs/cdn-rewrite";
import StandardHelmet from "../components/StandardHelmet";
import MyAlert from "../components/Alert";
import PageTitle from "../components/PageTitle";
import BlogSection from "../components/BlogSection";
import SidebarSection from "../components/SidebarSection";
import SocialShare from "../components/SocialShare";
//import "./Home.css";

export default function Source(props) {
  const [data, setData] = useState([]);
  const [people, setPeople] = useState(false);
  const [theories, setTheories] = useState(false);
  const [posts, setPosts] = useState(false);
  const [errors, setErrors] = useState(false);

  let queryStr = `source?slug=${props.match.params.source}`;
  let postStr = `posts?_fields=title,excerpt,slug,date&include=`;
  let theoryStr = `theory?_fields=title,excerpt,slug,date&include=`;
  let personStr = `person?_fields=title,excerpt,slug,date&include=`;
  
  
  useEffect(() => {
    async function onLoad() {
      let payload = [];
      let response = "";
      let postIDs = [];
      let theoryIDs = [];
      let peopleIDs = [];

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

      if(payload[0].source_posts) {
        postStr = postStr + payload[0].source_posts;
        try {
          response = await fetch(apiHeader + postStr);
          if (response.ok) { // ckeck if status code is 200
            postIDs = await response.json();
            //console.log(theoryIDs);
            setPosts(postIDs);
          } 
        } catch (e) {
          setErrors(true);
        }
      }

      if(payload[0].source_theory) {
        theoryStr = theoryStr + payload[0].source_theory;
        try {
          response = await fetch(apiHeader + theoryStr);
          if (response.ok) { // ckeck if status code is 200
            theoryIDs = await response.json();
            //console.log(theoryIDs);
            setTheories(theoryIDs);
          } 
        } catch (e) {
          setErrors(true);
        }
      }

      if(payload[0].source_person) {
        personStr = personStr + payload[0].source_person;
        try {
          response = await fetch(apiHeader + personStr);
          if (response.ok) { // ckeck if status code is 200
            peopleIDs = await response.json();
            //console.log(peopleIDs);
            setPeople(peopleIDs);
          } 
        } catch (e) {
          setErrors(true);
        }
      }
    }

    onLoad();
  }, [props.location.pathname]);

  return (
    <main>
      <StandardHelmet 
        title={data.length > 0 ? data[0].title.rendered : ""}
        link={"https://atlantis.fyi/sources/" + props.match.params.source} 
      />
      <MyAlert show={errors} text="Page loaded with error(s)" />
      <PageTitle loaded={props.isLoaded}>{data.length > 0 ? data[0].title.rendered : ""}</PageTitle>
      {data.length > 0
        ? <Row>
            {!people.length && !theories.length && !posts.length
              ? <Col className="d-none d-lg-block" lg={2}></Col>
              : null
            }
            <Col lg={8}>
              <Row className="mb-4">
                <Col>
                  <Button variant="secondary" size="lg" href={data[0].source_link}>Go to source</Button>
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
            {people.length > 0 || theories.length > 0 || posts.length > 0
              ? <Col lg={4}>
                  {people
                    ? <SidebarSection
                        data = {people}
                        titleSingle = "Person"
                        titleMultiple = "People"
                      />
                    : null
                  }
                  {theories
                    ? <SidebarSection
                        data = {theories}
                        titleSingle = "Theory"
                        titleMultiple = "Theories"
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
              : <Col className="d-none d-lg-block" lg={2}></Col>
            }
          </Row>
        : null
      }
    </main>
  );
}