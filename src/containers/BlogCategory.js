import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import { defaultDescription } from "../libs/seo";
import {Helmet} from "react-helmet";
import { categoryIDs, categoryNames } from "../libs/categories";
import PageTitle from "../components/PageTitle";
import SummaryPost from "../components/SummaryPost";

//import "./Home.css";

export default function BlogCategory(props) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);
  
  let blogQuery = `?categories=${categoryIDs[props.match.params.category]}&page=${page}&per_page=${pages}&_fields=title,date,excerpt,slug`;

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
      <Helmet>
        <title>Category: {categoryNames[categoryIDs[props.match.params.category]]} | Atlantis FYI</title>
        <link rel="canonical" href={"https://atlantis.fyi/blog/category/" + props.match.params.category} />
        <meta name="description" content={defaultDescription} />
      </Helmet>
      <PageTitle loaded={props.isLoaded}>{"Category: " + categoryNames[categoryIDs[props.match.params.category]]}</PageTitle>
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