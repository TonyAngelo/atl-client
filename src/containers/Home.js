import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import MyJumbotron from "../components/Jumbotron";
import FeaturedPost from "../components/FeaturedPost";
import SummaryPost from "../components/SummaryPost";
import SidebarPost from "../components/SidebarPost";
import { apiHeader } from "../libs/api";
//import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [sideBar, setSideBar] = useState([]);

  const blogQuery = "?page=1&per_page=7&_fields=categories,title,date,excerpt,slug,sticky";
  const sideBarQuery = "?page=1&per_page=1&_fields=categories,title,excerpt,slug";

  useEffect(() => {
    async function onLoad() {
      var asides = []
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
      // get sidebar, latest theory
      try {
        const response = await fetch(apiHeader + "theory" + sideBarQuery);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          payload[0].category = "theory"
          asides.push(payload[0])
        } 
      } catch (e) {
        alert(e);
      }

      try {
        const response = await fetch(apiHeader + "source" + sideBarQuery);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          payload[0].category = "source"
          asides.push(payload[0])
        } 
      } catch (e) {
        alert(e);
      }

      try {
        const response = await fetch(apiHeader + "person" + sideBarQuery);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          payload[0].category = "person"
          asides.push(payload[0])
        } 
      } catch (e) {
        alert(e);
      }
      
      setSideBar(asides);
    }

    onLoad();
  }, []);

  return (
    <main>

      <MyJumbotron 
        title = "The Atlantis Finder"
        text = "A step by step decision tree that leads you to the location of Atlantis."
        linkText = "Check it out!"
        link = "/finder"
      ></MyJumbotron>

  	  <Row className="mb-2">
        {posts.length > 0
          ? posts.filter(post => post.sticky).map((post, index) => 
                <FeaturedPost
                  key = {index}
                  catagory = {post.categories[0]}
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

        {posts.length > 0
	        ? <Col md={8} className="blog-main">
    	        <h3 className="pb-3 my-4 font-italic border-bottom">
    	          Discourse
    	        </h3>
              {posts.filter(post => !post.sticky).map((post, index) => 
                <SummaryPost
                  key = {index}
                  catagory = {post.categories[0]}
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

	      {sideBar.length > 0
          ? <aside className="col-md-4 blog-sidebar">
    	        <div className="p-3 mb-3 bg-light rounded">
    	          <h4 className="font-italic">Recent Additions</h4>
    	        </div>
              {sideBar.map((item, index) => 
                <SidebarPost
                  key = {index}
                  catagory = {item.category[0].toUpperCase() + item.category.slice(1)}
                  title = {item.title.rendered}
                  text = {item.excerpt.rendered}
                  link = {"/" + item.category + "/" + item.slug}>
                ></SidebarPost>
              )}
    	      </aside>
          : null
        }

	    </Row>
	  </main>
  );
}