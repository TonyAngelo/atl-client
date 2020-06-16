import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import MyAlert from "../components/Alert";
import PageTitle from "../components/PageTitle";
import BlogSection from "../components/BlogSection";
import SidebarDialogue from "../components/SidebarDialogue";
import SidebarSection from "../components/SidebarSection";
//import "./Home.css";

export default function Plato(props) {
  //const [title, setTitle] = useState("");
  //const [content, setContent] = useState("");
  const [writing, setWriting] = useState(false);
  const [atlantis, setAtlantis]= useState(false);
  const [posts, setPosts] = useState(false);
  const [data, setData] = useState([]);
  const [image, setImage] = useState({});
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    async function onLoad() {
      let payload = [];
      let response = "";
      let imageLink = "";
      let postIDs = [];
      let sourceIDs = [];
      let atlItems = [];
      let otherItems = [];

      const queryStr = "person?slug=plato&order=asc&_fields=categories,title,date,content,slug,writing,person_posts,_links";
      let postStr = `posts?_fields=title,excerpt,slug,date&include=`;
      let sourceStr = `source?_fields=title,excerpt,slug,date&page=1&per_page=100&include=`;

      props.setIsLoaded(false);
      
      // get page content
      try {
        response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          //console.log(payload)
          setData(payload);
          //setTitle(payload[0].title.rendered);
          //setContent(payload[0].content.rendered);
          // payload[0].writing.map(function(item, index) {
          //   if(item.post_name === "critias" || item.post_name === "timaeus") {
          //     atlItems.push(item);
          //   } else {
          //     otherItems.push(item);
          //   }
          // });
          // setAtlantis(atlItems);
          // setWriting(otherItems);
        } 
      } catch (e) {
        setErrors(true);
      }
      props.setIsLoaded(true);
      imageLink = payload[0]._links['wp:featuredmedia'][0].href;

      try {
        response = await fetch(imageLink);
        if (response.ok) { // ckeck if status code is 200
          const imgPayload = await response.json();
          //console.log(imgPayload);
          setImage(imgPayload);
        } 
      } catch (e) {
        alert(e);
      }

      if(payload[0].writing) {
        sourceStr = sourceStr + payload[0].writing;
        try {
          response = await fetch(apiHeader + sourceStr);
          if (response.ok) { // ckeck if status code is 200
            sourceIDs = await response.json();
            //console.log(sourceIDs);
            //setWriting(sourceIDs);
            sourceIDs.map(function(item, index) {
              if(item.slug === "critias" || item.slug === "timaeus") {
                atlItems.push(item);
              } else {
                otherItems.push(item);
              }
            });
            //console.log(atlItems);
            setAtlantis(atlItems);
            setWriting(otherItems);
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
        title={"Plato"}
        link={"https://atlantis.fyi/plato"} 
      />
      <MyAlert show={errors} text="Page loaded with error(s)" />
      <PageTitle loaded={props.isLoaded}>{data.length > 0 ? data[0].title.rendered : ""}</PageTitle>
      {data.length > 0
        ? <Row>
            <Col md={8}>
              <BlogSection
                meta={false}
                image={image}
                data={data[0]}
              />
            </Col>
            <Col md={4}>
              {atlantis
                ? <SidebarSection
                    data = {atlantis}
                    titleSingle = "Atlantis dialogue"
                    titleMultiple = "Atlantis dialogues"
                    linkPath = "sources"
                  />
                : null
              }
              {writing
                ? <SidebarSection
                    data = {writing}
                    titleSingle = "Related Source"
                    titleMultiple = "Related Sources"
                    linkPath = "sources"
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