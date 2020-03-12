import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import SidebarPost from "../components/SidebarPost";
//import "./Home.css";

export default function Theories() {
  const [theories, setTheories] = useState([]);

  const queryStr = "theory?&_fields=title,excerpt,slug";

  useEffect(() => {
    async function onLoad() {
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          setTheories(payload);
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
          <h1 className="my-2">Theories</h1>
        </Col>
	    </Row>
      <Row>
        {theories.length > 0
          ? theories.map((item, index) =>
              <Col key = {index} md={6} lg={4} xl={3}>
                <SidebarPost
                  title = {item.title.rendered}
                  text = {item.excerpt.rendered}
                  link = {"/theories/" + item.slug}>
                </SidebarPost>
              </Col>
            )
          : null
        }
      </Row>
	  </main>
  );
}