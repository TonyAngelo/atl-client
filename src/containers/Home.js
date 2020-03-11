import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Jumbotron, Card } from 'react-bootstrap';
import MyJumbotron from "../components/Jumbotron";
import FeaturedPost from "../components/FeaturedPost";
import SummaryPost from "../components/SummaryPost";
import SidebarPost from "../components/SidebarPost";
//import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function onLoad() {
      try {
        //const payload = loadPosts();
        const response = await fetch("http://api.atlantis.fyi/wp-json/wp/v2/posts?page=1&per_page=7&_fields=categories,title,date,excerpt,slug,sticky");
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload)
          setPosts(payload);
        } 
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, []);

  function loadPosts() {

  }

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
	      <Col md={8} className="blog-main">
	        <h3 className="pb-3 my-4 font-italic border-bottom">
	          Discourse
	        </h3>
          {posts.length > 0
            ? posts.filter(post => !post.sticky).map((post, index) => 
                <SummaryPost
                  key = {index}
                  catagory = {post.categories[0]}
                  title = {post.title.rendered}
                  date = {post.date}
                  text = {post.excerpt.rendered}
                  link = {"/blog/" + post.slug}>
                </SummaryPost>
              )
            : null
          }

	        <nav className="blog-pagination">
	          <Link className="btn btn-outline-primary" to="#">Older</Link>
	          <Link className="btn btn-outline-secondary disabled" to="#">Newer</Link>
	        </nav>

	      </Col>

	      <aside className="col-md-4 blog-sidebar">
	        <div className="p-3 mb-3 bg-light rounded">
	          <h4 className="font-italic">Recent Additions</h4>
	        </div>

          <SidebarPost
            catagory = "Theory"
            title = "New Theory"
            date = "Nov 11, 2019"
            text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed mi lacus. Curabitur tempor laoreet urna ut sodales. Phasellus eleifend magna a purus congue varius. Phasellus vel fermentum orci. Quisque congue luctus metus, ut luctus diam ultrices at."
            link = "/theory/new-theory"
          ></SidebarPost>

          <SidebarPost
            catagory = "Source"
            title = "New Source"
            date = "Nov 11, 2019"
            text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed mi lacus. Curabitur tempor laoreet urna ut sodales. Phasellus eleifend magna a purus congue varius. Phasellus vel fermentum orci. Quisque congue luctus metus, ut luctus diam ultrices at."
            link = "/source/new-source"
          ></SidebarPost>

          <SidebarPost
            catagory = "Person"
            title = "New Person"
            date = "Nov 11, 2019"
            text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed mi lacus. Curabitur tempor laoreet urna ut sodales. Phasellus eleifend magna a purus congue varius. Phasellus vel fermentum orci. Quisque congue luctus metus, ut luctus diam ultrices at."
            link = "/person/new-person"
          ></SidebarPost>
	        
	      </aside>
	    </Row>
	  </main>
  );
}