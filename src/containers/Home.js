import React, { useState, useEffect } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import { Row, Col, Image } from 'react-bootstrap';
import MyJumbotron from "../components/Jumbotron";
import FeaturedPost from "../components/FeaturedPost";
import SummaryPost from "../components/SummaryPost";
import SidebarPost from "../components/SidebarPost";
import BlogMdAdBanner from "../components/BlogMdAdBanner";
import BlogSideAdBanner from "../components/BlogSideAdBanner";
import { apiHeader } from "../libs/api";
//import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [sideBar, setSideBar] = useState([]);

  const blogQuery = "?page=1&per_page=7&_fields=categories,title,date,excerpt,slug,sticky";
  const sideBarQuery = "?page=1&per_page=1&_fields=categories,title,excerpt,slug";

  useEffect(() => {
    async function onLoad() {
      //var asides = []
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
      // // get sidebar, latest theory
      // try {
      //   const response = await fetch(apiHeader + "theory" + sideBarQuery);
      //   if (response.ok) { // ckeck if status code is 200
      //     const payload = await response.json();
      //     payload[0].category = "theory"
      //     asides.push(payload[0])
      //   } 
      // } catch (e) {
      //   alert(e);
      // }

      // try {
      //   const response = await fetch(apiHeader + "source" + sideBarQuery);
      //   if (response.ok) { // ckeck if status code is 200
      //     const payload = await response.json();
      //     payload[0].category = "source"
      //     asides.push(payload[0])
      //   } 
      // } catch (e) {
      //   alert(e);
      // }

      // try {
      //   const response = await fetch(apiHeader + "person" + sideBarQuery);
      //   if (response.ok) { // ckeck if status code is 200
      //     const payload = await response.json();
      //     payload[0].category = "person"
      //     asides.push(payload[0])
      //   } 
      // } catch (e) {
      //   alert(e);
      // }
      
      // setSideBar(asides);
    }

    onLoad();
  }, []);

  return (
    <main>

      <MyJumbotron 
        title = "The Atlantis Finder"
        text = "A step by step decision tree that leads you to the location of Atlantis."
        linkText = "Check it out!"
        link = "/finder">
      </MyJumbotron>

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
	        ? <Col md={10} className="blog-main">
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

	      <BlogSideAdBanner></BlogSideAdBanner>

	    </Row>
	  </main>
  );
}