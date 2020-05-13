import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Badge } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import PageTitle from "../components/PageTitle";
import SummaryPost from "../components/SummaryPost";
import SidebarSection from "../components/SidebarSection";
import SidebarTitle from "../components/SidebarTitle";
import { categoryBadge, categoryNames, categoryIDs } from "../libs/categories";

//import "./Home.css";

export default function Blog(props) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [sources, setSources] = useState(false);
  const [tags, setTags] = useState([]);
  //const [pages, setPages] = useState(10);

  const pages = 100;
  let blogQuery = `?page=${page}&per_page=${pages}&_fields=categories,title,date,excerpt,slug,sticky`;
  let sourceStr = `source?_fields=title,excerpt,slug,date&include=99,98`;
  let tagStr = `tags?_fields=count,name,slug&page=1&per_page=100&hide_empty=true`;

  useEffect(() => {
    async function onLoad() {
      let payload = [];
      let response = "";
      props.setIsLoaded(false);
      // get posts
      try {
        response = await fetch(apiHeader + "posts" + blogQuery);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          //console.log(payload);
          setPosts(payload);
        } 
      } catch (e) {
        alert(e);
      }
      props.setIsLoaded(true);

      // get sources
      try {
        response = await fetch(apiHeader + sourceStr);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          //console.log(sourceIDs);
          setSources(payload);
        } 
      } catch (e) {
        alert(e);
      }

      // get tags
      try {
        response = await fetch(apiHeader + tagStr);
        if (response.ok) { // ckeck if status code is 200
          payload = await response.json();
          console.log(payload);
          setTags(payload);
        } 
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [blogQuery]);

  return (
    <main>
      <StandardHelmet 
        title={"Blog"}
        link={"https://atlantis.fyi/blog"} 
      />
      <PageTitle loaded={props.isLoaded}>Blog Posts</PageTitle>
	    <Row>
        {posts.length > 0
	        ? <Col lg={8} className="blog-main">
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
            {Object.keys(categoryIDs).map((item, index) => <Link key={index} to={"/blog/category/"+item}><Badge className="categoryLink m-2" variant={categoryBadge[categoryIDs[item]]}>{categoryNames[categoryIDs[item]]}</Badge></Link>)}
          </div>
          <SidebarTitle>Blog Tags</SidebarTitle>
          <div>
            {tags.map((item, index) => <Link key={index} to={"/blog/tag/"+item.slug}><Badge className="tagLink m-1" variant={"primary"}>{item.name}</Badge></Link>)}
          </div>
        </Col>
	    </Row>
	  </main>
  );
}