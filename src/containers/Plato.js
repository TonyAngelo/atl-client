import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import { defaultDescription } from "../libs/seo";
import {Helmet} from "react-helmet";
import PageTitle from "../components/PageTitle";
import BlogSection from "../components/BlogSection";
import SidebarDialogue from "../components/SidebarDialogue";
//import "./Home.css";

export default function Plato(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writing, setWriting] = useState([]);
  const [atlantis, setAtlantis]= useState([]);
  const [data, setData] = useState([]);

  const queryStr = "person?_embed&slug=plato&order=asc";

  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
      let atlItems = [];
      let otherItems = [];
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload)
          setData(payload);
          //setTitle(payload[0].title.rendered);
          //setContent(payload[0].content.rendered);
          payload[0].writing.map(function(item, index) {
            if(item.post_name === "critias" || item.post_name === "timaeus") {
              atlItems.push(item);
            } else {
              otherItems.push(item);
            }
          });
          setAtlantis(atlItems);
          setWriting(otherItems);
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
        <link rel="canonical" href={"https://atlantis.fyi/plato"} />
        <meta name="description" content={defaultDescription} />
      </Helmet>
      <PageTitle loaded={props.isLoaded}>{data.length > 0 ? data[0].title.rendered : ""}</PageTitle>
      {data.length > 0
        ? <Row>
            <Col md={8}>
              <BlogSection
                meta={false}
                data={data[0]}
              />
            </Col>
            <Col md={4}>
              <div className="p-3 mb-3 bg-light rounded">
                <h4 className="font-italic">Atlantis dialogues</h4>
              </div>
              {atlantis.map((item, index) => 
                <SidebarDialogue
                  key = {index}
                  title = {item.post_title}
                  text = {item.post_excerpt}
                  link = {"/sources/" + item.post_name}
                  linkText = "Go to dialogue">
                </SidebarDialogue>
              )}
              <div className="p-3 mb-3 bg-light rounded">
                <h4 className="font-italic">Related Sources</h4>
              </div>
              {writing.map((item, index) => 
                <SidebarDialogue
                  key = {index}
                  title = {item.post_title}
                  text = {item.post_excerpt}
                  link = {"/sources/" + item.post_name}
                  linkText = "Go to source">
                </SidebarDialogue>
              )}
            </Col>
          </Row>
        : null
      }
	  </main>
  );
}