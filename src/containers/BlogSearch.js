import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
//import { categoryIDs, categoryNames } from "../libs/categories";
import PageTitle from "../components/PageTitle";
import SearchPost from "../components/SearchPost";

//import "./Home.css";

export default function BlogSearch(props) {
  const [data, setData] = useState([]);
  
  let blogQuery = `search?search=${props.match.params.search}`;

  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
      // get search
      try {
        const response = await fetch(apiHeader + blogQuery);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload)
          setData(payload);
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
      <PageTitle loaded={props.isLoaded}>{"Search: " + props.match.params.search}</PageTitle>
	    <Row>
        <Col className="d-none d-lg-block" lg={1}></Col>
        {data.length > 0
	        ? <Col lg={10} className="blog-main">
              {data.map((post, index) => 
                <SearchPost
                  key = {index}
                  index = {index}
                  title = {post.title}
                  link = {post.url}>
                </SearchPost>
              )}
    	      </Col>
          : null
        }
        <Col className="d-none d-lg-block" lg={1}></Col>
	    </Row>
	  </main>
  );
}