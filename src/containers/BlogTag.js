import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
//import { categoryIDs, categoryNames } from "../libs/categories";
import PageTitle from "../components/PageTitle";
import SummaryPost from "../components/SummaryPost";

//import "./Home.css";

export default function BlogTag(props) {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);
  
  let tagQuery = `tags?slug=${props.match.params.tag}`
  let blogQuery = `?page=${page}&per_page=${pages}&_fields=title,date,excerpt,slug`;

  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
      // get tag
      try {
        const response = await fetch(apiHeader + tagQuery);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload)
          blogQuery = blogQuery + "&tags=" + payload[0].id
          setName(payload[0].name);
        } 
      } catch (e) {
        alert(e);
      }
      // get posts
      try {
        const response = await fetch(apiHeader + "posts" + blogQuery);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          setPosts(payload);
        } 
      } catch (e) {
        alert(e);
      }
      props.setIsLoaded(true);
    }

    onLoad();
  }, [blogQuery]);

  return (
    <main>
      <PageTitle loaded={props.isLoaded}>{"Tag: " + name}</PageTitle>
	    <Row>
        <Col className="d-none d-lg-block" lg={2}></Col>
        {posts.length > 0
	        ? <Col lg={8} className="blog-main">
              {posts.map((post, index) => 
                <SummaryPost
                  key = {index}
                  index = {index}
                  title = {post.title.rendered}
                  date = {post.date}
                  text = {post.excerpt.rendered}
                  link = {"/blog/" + post.slug}>
                </SummaryPost>
              )}
    	      </Col>
          : null
        }
        <Col className="d-none d-lg-block" lg={2}></Col>
	    </Row>
	  </main>
  );
}