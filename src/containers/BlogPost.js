import React, { useState, useEffect } from "react";
import { Row, Col, Figure } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import PageTitle from "../components/PageTitle";
import BlogSection from "../components/BlogSection";
import FeaturedImage from "../components/FeaturedImage";
import BlogContent from "../components/BlogContent";
import SidebarSection from "../components/SidebarSection";
//import "./Home.css";

export default function BlogPost(props) {
  const [data, setData] = useState([]);
  const [image, setImage] = useState({});
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [sources, setSources] = useState(false);
  const [people, setPeople] = useState(false);
  const [theories, setTheories] = useState(false);

  let queryStr = `posts?slug=${props.match.params.post}&_fields=title,date,content,slug,excerpt,_links,post_sources,post_people,post_theories`;
  let sourceStr = `source?_fields=title,excerpt,slug,date&include=`;
  let theoryStr = `theory?_fields=title,excerpt,slug,date&include=`;
  let personStr = `person?_fields=title,excerpt,slug,date&include=`;

  useEffect(() => {
    async function onLoad() {
      let payload = [];
      let response = "";
      let imageLink = "";
      let catLink = "";
      let tagLink = "";
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

      catLink = payload[0]._links['wp:term'][0].href;
      tagLink = payload[0]._links['wp:term'][1].href;
      let souceIDs = [];
      let theoryIDs = [];
      let peopleIDs = [];

      if(payload[0].post_sources) {
        sourceStr = sourceStr + payload[0].post_sources;
        try {
          response = await fetch(apiHeader + sourceStr);
          if (response.ok) { // ckeck if status code is 200
            souceIDs = await response.json();
            //console.log(sourceIDs);
            setSources(souceIDs);
          } 
        } catch (e) {
          alert(e);
        }
      }

      if(payload[0].post_theories) {
        theoryStr = theoryStr + payload[0].post_theories;
        try {
          response = await fetch(apiHeader + theoryStr);
          if (response.ok) { // ckeck if status code is 200
            theoryIDs = await response.json();
            //console.log(theoryIDs);
            setTheories(theoryIDs);
          } 
        } catch (e) {
          alert(e);
        }
      }

      if(payload[0].post_people) {
        personStr = personStr + payload[0].post_people;
        try {
          response = await fetch(apiHeader + personStr);
          if (response.ok) { // ckeck if status code is 200
            peopleIDs = await response.json();
            //console.log(peopleIDs);
            setPeople(peopleIDs);
          } 
        } catch (e) {
          alert(e);
        }
      }


      try {
        response = await fetch(catLink);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          //console.log(payload);
          setCategory(payload);
        } 
      } catch (e) {
        alert(e);
      }

      try {
        response = await fetch(tagLink);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          //console.log(payload);
          setTags(payload);
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
        ? <StandardHelmet 
            title={data[0].title.rendered}
            description={data.length > 0 ? data[0].excerpt.rendered : ""}
            link={"https://atlantis.fyi/blog/" + props.match.params.post} 
          />
        : null
      }
      <PageTitle loaded={props.isLoaded}>{data.length > 0 ? data[0].title.rendered : ""}</PageTitle>
      {data.length > 0
        ? <Row>
            <Col lg={8}>
              <BlogSection
                data={data[0]}
                image={image}
                cats={category}
                tags={tags}
              />
            </Col>
            <Col lg={4}>
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
              {sources
                ? <SidebarSection
                    data = {sources}
                    titleSingle = "Source"
                    titleMultiple = "Sources"
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