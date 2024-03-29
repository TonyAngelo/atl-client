import React, { useState, useEffect } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import { Row, Col } from 'react-bootstrap';
import MyAlert from "../components/Alert";
import MyJumbotron from "../components/Jumbotron";
import FeaturedPost from "../components/FeaturedPost";
import SummaryPost from "../components/SummaryPost";
import SidebarSection from "../components/SidebarSection";
import SidebarTitle from "../components/SidebarTitle";
import { categoryBadge, categoryNames, categoryIDs } from "../libs/categories";
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
//import "./Home.css";

export default function Home(props) {
  const [sticky, setSticky] = useState([]);
  const [posts, setPosts] = useState([]);
  const [sources, setSources] = useState(false);
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState(false);
  
  const jumboOn = false;

  useEffect(() => {
    async function onLoad() {
      let payload = [];
      let response = "";
      
      const stickyQuery = "posts?page=1&per_page=2&sticky=true&_fields=id,categories,title,date,excerpt,slug,sticky";
      let blogQuery = "posts?page=1&per_page=5&_fields=categories,title,date,excerpt,slug,sticky";
      //const sideBarQuery = "?page=1&per_page=1&_fields=categories,title,excerpt,slug";
      let sourceStr = `source?_fields=title,excerpt,slug,date&include=99,98`;
      let tagStr = `tags?_fields=count,name,slug&page=1&per_page=100&hide_empty=true`;

      props.setIsLoaded(false);
      //props.setNavKey("");
      // get sticky
      try {
        response = await fetch(apiHeader + stickyQuery);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          //console.log(payload);
          if(payload.length > 0) {
            blogQuery = blogQuery + "&exclude="
            payload.map((item, index) => blogQuery = blogQuery + item.id + ",");
          }
          setSticky(payload);
        } 
      } catch (e) {
        setErrors(true);
      }

      props.setIsLoaded(true);

      // get posts
      try {
        response = await fetch(apiHeader + blogQuery);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          //console.log(payload);
          setPosts(payload);
        } 
      } catch (e) {
        setErrors(true);
      }
      
      // get sources
      try {
        response = await fetch(apiHeader + sourceStr);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          //console.log(sourceIDs);
          setSources(payload);
        } 
      } catch (e) {
        setErrors(true);
      }

      // get tags
      try {
        response = await fetch(apiHeader + tagStr);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          //console.log(payload);
          setTags(payload);
        } 
      } catch (e) {
        setErrors(true);
      }
    }

    onLoad();
  }, [props.location.pathname]);

  return (
    <main>
      <StandardHelmet 
        title={""}
        link={"https://atlantis.fyi"} 
      />
      <MyAlert show={errors} text="Page loaded with error(s)" />
      {jumboOn
        ? <MyJumbotron 
            title = "The Atlantis Finder"
            text = "A step by step decision tree that leads you to the location of Atlantis."
            linkText = "Check it out!"
            link = "/finder" 
          />
        : <MyJumbotron 
            title = "Atlantis FYI"
            text = "Sources, Analysis, and Hot Takes concerning Plato's Lost Island of Atlantis."
            linkText = "Learn More"
            link = "/about" 
          />
      }
  	  <Row className="mb-2">
        {sticky.length > 0
          ? sticky.map((post, index) => 
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
        {posts.length > 0
	        ? <Col lg={8} className="blog-main">
    	        <h3 className="pb-3 my-4 font-italic border-bottom">
    	          Recent Posts
    	        </h3>
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
        	      <Link className="btn btn-outline-primary" to="/blog#more">More Posts</Link>
        	    </nav>
    	      </Col>
          : null
        }
        <Col md={4}>
          {sources
            ? <SidebarSection
                data = {sources}
                titleSingle = "Atlantis dialogue"
                titleMultiple = "Atlantis dialogues"
                linkPath = "source"
              />
            : null
          }
          <SidebarTitle>Blog Categories</SidebarTitle>
          <div className="mb-4">
            {Object.keys(categoryIDs).map((item, index) => <Link className={"categoryLink m-2 badge badge-" + categoryBadge[categoryIDs[item]]} key={index} to={"/blog/category/"+item}>{categoryNames[categoryIDs[item]]}</Link>)}
          </div>
          <SidebarTitle>Blog Tags</SidebarTitle>
          <div>
            {tags.map((item, index) => <Link className="badge badge-primary tagLink m-1" key={index} to={"/blog/tag/"+item.slug}>{item.name}</Link>)}
          </div>
        </Col>
	    </Row>
	  </main>
  );
}