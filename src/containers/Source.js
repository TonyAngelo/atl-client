import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { apiHeader } from "../libs/api";
import SidebarPost from "../components/SidebarPost";
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//import "./Home.css";

export default function Source(props) {
  const [source, setSource] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const queryStr = `source?slug=${props.match.params.source}`;

  useEffect(() => {
    async function onLoad() {
      // get page content
      try {
        const response = await fetch(apiHeader + queryStr);
        if (response.ok) { // ckeck if status code is 200
          const payload = await response.json();
          console.log(payload);
          setSource(payload);
        } 
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, []);

  return (
    <main>
      {source.length > 0
        ? <div><Row className="my-4 text-center">
            <Col>
              <h1 className="my-2">{source[0].title.rendered}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={1}></Col>
            <Col md={7}>
              <div dangerouslySetInnerHTML={{ __html: source[0].content.rendered }} />
              {source[0].attachment
                ? <div>
                    <Document
                      file={'https://cdn.' + source[0].attachment.guid.substring(source[0].attachment.guid.search('api.')+4)}
                      onLoadSuccess={setNumPages}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>
                    <p>Page {pageNumber} of {numPages}</p>
                  </div>
                : null
              }
            </Col>
            <Col md={3}>
              {source[0].source_person
                ? <div><div className="p-3 mb-3 bg-light rounded">
                    <h4 className="font-italic">Author</h4>
                  </div>
                  <SidebarPost
                    title = {source[0].source_person[0].post_title}
                    text = {source[0].source_person[0].post_excerpt}
                    link = {"/person/" + source[0].source_person[0].post_name}
                    linkText = "Go to page">
                  </SidebarPost></div>
                : null
              }
              {source[0].source_theory
                ? <div><div className="p-3 mb-3 bg-light rounded">
                    <h4 className="font-italic">Theory</h4>
                  </div><SidebarPost
                    title = {source[0].source_theory[0].post_title}
                    text = {source[0].source_theory[0].post_excerpt}
                    link = {"/theory/" + source[0].source_theory[0].post_name}
                    linkText = "Go to page">
                  </SidebarPost></div>
                : null
              }
            </Col>
            <Col md={1}></Col>
          </Row></div>
        : null
      }
    </main>
  );
}