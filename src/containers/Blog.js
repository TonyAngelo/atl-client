import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image } from 'react-bootstrap';
import MyJumbotron from "../components/Jumbotron";
import FeaturedPost from "../components/FeaturedPost";
import SummaryPost from "../components/SummaryPost";
import SidebarPost from "../components/SidebarPost";
import BlogMdAdBanner from "../components/BlogMdAdBanner";
import BlogSideAdBanner from "../components/BlogSideAdBanner";
import { apiHeader } from "../libs/api";
//import "./Home.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  const blogQuery = "?page=1&per_page=20&_fields=categories,title,date,excerpt,slug,sticky";

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
  }, []);

  return (
    <main>
      <Row className="my-4 text-center">
        <Col>
          <h1 className="my-2">Dialogue</h1>
        </Col>
      </Row>

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

      <BlogMdAdBanner></BlogMdAdBanner>

	    <Row>
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
              <nav className="blog-pagination">
    	          <Link className="btn btn-outline-primary" to="#">Older</Link>
    	          <Link className="btn btn-outline-secondary disabled" to="#">Newer</Link>
    	        </nav>
    	      </Col>
          : null
        }

        <BlogSideAdBanner></BlogSideAdBanner>

	    </Row>
	  </main>
  );
}