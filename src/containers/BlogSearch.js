import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import { defaultDescription } from "../libs/seo";
import {Helmet} from "react-helmet";
import PageTitle from "../components/PageTitle";
import SearchPost from "../components/SearchPost";

//import "./Home.css";

export default function BlogSearch(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(10);
  
  let blogQuery = `search?search=${props.match.params.search}&page=${page}&per_page=${pages}&subtype=post,people,sources,theories&_embed`;

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
      <Helmet>
        <title>Search: {props.match.params.search} | Atlantis FYI</title>
        <link rel="canonical" href={"https://atlantis.fyi/search/" + props.match.params.search} />
        <meta name="description" content={defaultDescription} />
      </Helmet>
      <PageTitle loaded={props.isLoaded}>{"Search: " + props.match.params.search}</PageTitle>
	    <Row>
        <Col className="d-none d-lg-block" lg={2}></Col>
        {data.length > 0
	        ? <Col lg={8} className="blog-main">
              {data.map((post, index) => 
                <SearchPost
                  key = {index}
                  index = {index}
                  category = {post.subtype}
                  title = {post['_embedded']['self'][0].title.rendered}
                  date = {post['_embedded']['self'][0].date}
                  text = {post['_embedded']['self'][0].excerpt.rendered}
                  link = {"/" + post.url.substring(25,post.url.length)}>
                </SearchPost>
              )}
    	      </Col>
          : null
        }
        <Col className="d-none d-lg-block" lg={2}></Col>
	    </Row>
	  </main>
  );
}