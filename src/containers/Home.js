import React, { useState, useEffect } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import { Row, Col } from 'react-bootstrap';
import MyJumbotron from "../components/Jumbotron";
import FeaturedPost from "../components/FeaturedPost";
import SummaryPost from "../components/SummaryPost";
import { apiHeader } from "../libs/api";
//import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const jumboOn = false;
  const blogQuery = "?page=1&per_page=7&_fields=categories,title,date,excerpt,slug,sticky";
  //const sideBarQuery = "?page=1&per_page=1&_fields=categories,title,excerpt,slug";

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
      {jumboOn
        ? <MyJumbotron 
            title = "The Atlantis Finder"
            text = "A step by step decision tree that leads you to the location of Atlantis."
            linkText = "Check it out!"
            link = "/finder" 
          />
        : <MyJumbotron 
            title = "Atlantis FYI"
            text = "A compendium of Atlantis information."
          />
      }
  	  <Row className="mb-2">
        {posts.length > 0
          ? posts.filter(post => post.sticky).map((post, index) => 
                <FeaturedPost
                  key = {index}
                  category = {post.categories[0]}
                  title = {post.title.rendered}
                  date = {post.date}
                  text = {post.excerpt.rendered}
                  link = {"/blog/" + post.slug}>
                </FeaturedPost>
              )
          : null
        }
  	  </Row>
	    <Row>
        <Col className="d-none d-lg-block" lg={1}></Col>
        {posts.length > 0
	        ? <Col lg={10} className="blog-main">
    	        <h3 className="pb-3 my-4 font-italic border-bottom">
    	          Dialogue
    	        </h3>
              {posts.filter(post => !post.sticky).map((post, index) => 
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
              <nav className="blog-pagination">
    	          <Link className="btn btn-outline-primary" to="/dialogue#more">See More Posts</Link>
    	        </nav>
    	      </Col>
          : null
        }
        <Col className="d-none d-lg-block" lg={1}></Col>
	    </Row>
	  </main>
  );
}