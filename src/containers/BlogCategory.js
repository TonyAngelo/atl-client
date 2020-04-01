import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import { categoryIDs, categoryNames } from "../libs/categories";
import PageTitle from "../components/PageTitle";
import SummaryPost from "../components/SummaryPost";

//import "./Home.css";

export default function BlogCategory(props) {
  const [posts, setPosts] = useState([]);

  let blogQuery = `?categories=${categoryIDs[props.match.params.category]}&page=1&per_page=20&_fields=title,date,excerpt,slug`;

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
      <PageTitle loaded={props.isLoaded}>{"Category: " + categoryNames[categoryIDs[props.match.params.category]]}</PageTitle>
	    <Row>
        <Col className="d-none d-lg-block" lg={1}></Col>
        {posts.length > 0
	        ? <Col lg={10} className="blog-main">
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
        <Col className="d-none d-lg-block" lg={1}></Col>
	    </Row>
	  </main>
  );
}