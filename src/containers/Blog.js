import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import SummaryPost from "../components/SummaryPost";
import { apiHeader } from "../libs/api";
//import "./Home.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  const blogQuery = "?page=1&per_page=100&_fields=categories,title,date,excerpt,slug,sticky";

  useEffect(() => {
    async function onLoad() {
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
    }

    onLoad();
  }, [blogQuery]);

  return (
    <main>
      <Row className="my-4 text-center">
        <Col>
          <h1 className="my-2">Dialogue</h1>
        </Col>
      </Row>
	    <Row>
        <Col className="d-none d-lg-block" lg={1}></Col>
        {posts.length > 0
	        ? <Col lg={10} className="blog-main">
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
        <Col className="d-none d-lg-block" lg={1}></Col>
	    </Row>
	  </main>
  );
}