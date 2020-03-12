import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import SidebarPost from "../components/SidebarPost";
//import "./Home.css";

export default function People() {
  const [people, setPeople] = useState([]);

  const queryStr = "person?&_fields=title,excerpt,slug";

  useEffect(() => {
    async function onLoad() {
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          setPeople(payload);
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
          <h1 className="my-2">People</h1>
        </Col>
	    </Row>
      <Row>
        {people.length > 0
          ? people.map((item, index) =>
              <Col key = {index} md={6} lg={4} xl={3}>
                <SidebarPost
                  title = {item.title.rendered}
                  text = {item.excerpt.rendered}
                  link = {"/people/" + item.slug}>
                </SidebarPost>
              </Col>
            )
          : null
        }
      </Row>
	  </main>
  );
}