import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import PageTitle from "../components/PageTitle";
import SummaryPost from "../components/SummaryPost";

//import "./Home.css";

export default function Blog(props) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);

  let blogQuery = `?page=${page}&per_page=${pages}&_fields=categories,title,date,excerpt,slug,sticky`;

  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
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
      <StandardHelmet 
        title={"Blog"}
        link={"https://atlantis.fyi/blog"} 
      />
      <PageTitle loaded={props.isLoaded}>Dialogue</PageTitle>
	    <Row>
        <Col className="d-none d-lg-block" lg={2}></Col>
        {posts.length > 0
	        ? <Col lg={8} className="blog-main">
              {posts.map((post, index) => 
                <SummaryPost
                  key = {index}
                  index = {index}
                  category = {post.categories[0]}
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