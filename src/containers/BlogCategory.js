import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import MyAlert from "../components/Alert";
import { categoryIDs, categoryNames } from "../libs/categories";
import PageTitle from "../components/PageTitle";
import SummaryPost from "../components/SummaryPost";

//import "./Home.css";

export default function BlogCategory(props) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  //const [pages, setPages] = useState(10);
  const [errors, setErrors] = useState(false);
  
  const pages = 100;
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
        setErrors(true);
      }
      props.setIsLoaded(true);
    }

    onLoad();
  }, [props.location.pathname]);

  return (
    <main>
      <StandardHelmet 
        title={"Category: " + categoryNames[categoryIDs[props.match.params.category]]}
        link={"https://atlantis.fyi/blog/category/" + props.match.params.category} 
      />
      <MyAlert show={errors} text="Page loaded with error(s)" />
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