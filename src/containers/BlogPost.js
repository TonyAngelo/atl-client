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
  let queryStr = `posts?slug=${props.match.params.post}&_fields=title,date,content,slug,excerpt,_links`;
  
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
          console.log(payload);
          setData(payload);
        } 
      } catch (e) {
        alert(e);
      }

      props.setIsLoaded(true);

      imageLink = payload[0]._links['wp:featuredmedia'][0].href;
      catLink = payload[0]._links['wp:term'][0].href;
      tagLink = payload[0]._links['wp:term'][1].href;

      try {
        response = await fetch(imageLink);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          //console.log(payload);
          setImage(payload);
        } 
      } catch (e) {
        alert(e);
      }

      try {
        response = await fetch(catLink);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          console.log(payload);
          setCategory(payload);
        } 
      } catch (e) {
        alert(e);
      }

      try {
        response = await fetch(tagLink);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          console.log(payload);
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
            <Col className="d-none d-lg-block" lg={1} xl={2}></Col>
            <Col lg={10} xl={8}>
              <BlogSection
                data={data[0]}
                image={image}
                cats={category}
                tags={tags}
              />
            </Col>
            <Col className="d-none d-lg-block" lg={1} xl={2}></Col>
          </Row>
        : null
      }
    </main>
  );
}