import React, { useState, useEffect } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import { apiHeader } from "../libs/api";
import StandardHelmet from "../components/StandardHelmet";
import PageTitle from "../components/PageTitle";
import TiledPostPage from "../components/TiledPostPage";
//import "./Home.css";

export default function Sources(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState("asc");
  const [filter, setFilter] = useState("date");
  //const [pages, setPages] = useState(100);

  const pages = 100;

  useEffect(() => {
    async function onLoad() {
      props.setIsLoaded(false);
      let queryStr = `source?&order=${direction}&orderby=${filter}&page=${page}&per_page=${pages}&_fields=title,excerpt,slug,date,source_author,source_translator`;
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          //console.log(payload);
          setData(payload);
        } 
      } catch (e) {
        alert(e);
      }
      props.setIsLoaded(true);
    }

    onLoad();
  }, [props.location.pathname, filter, direction]);

  function changeSortType(sel) {
    setFilter(sel);
  }

  function changeSortDirection(sel) {
    setDirection(sel);
  }

  return (
    <main>
      <StandardHelmet 
        title={"Sources"}
        link={"https://atlantis.fyi/sources"} 
      />
      <PageTitle loaded={props.isLoaded}>Sources</PageTitle>
      <Row className="mb-4">
        <Col xs={6} className="tile-filters"> 
          <Nav 
           
           variant="pills"
           defaultActiveKey="date"
           onSelect={changeSortType}
          >
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>Sort by</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="date">date</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="title">title</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={6} className="tile-filters"> 
          <Nav 
           className="justify-content-end"
           variant="pills"
           defaultActiveKey="asc"
           onSelect={changeSortDirection}
          >
            
            {["asc","desc"].map((item, index) => 
              <Nav.Item key={index}>
                <Nav.Link eventKey={item}>{item}</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Col>
      </Row>
      <TiledPostPage
        path = "sources"
        data = {data}
        meta = {true}
      />
    </main>
  );
}