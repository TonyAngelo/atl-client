import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Routes from "./Routes";
import './App.css';

function App() {
  const headerCatagories = [
    'Dialogue', 'Theories', 'Sources', 'People', 'Plato', 'Catastrophism', 'Finder', 'About', 'Contact'
  ];

  return (
    <div id="home">
      <Container className="mb-4">
        <header className="blog-header py-3">
          <Row className="flex-nowrap justify-content-between align-items-center">
            <Col md={4} className="pt-1">
              <p></p>
            </Col>
            <Col md={4} className="text-center">
              <Link className="blog-header-logo text-dark" to="/">Atlantis FYI</Link>
            </Col>
            <Col md={4} className="d-flex justify-content-end align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-3"><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></svg>
            </Col>
          </Row>
        </header>
        <div className="nav-scroller py-1 mb-2">
          <Nav className="d-flex justify-content-between">
            {headerCatagories.map((item, index) => 
              <Link key={index} to={"/" + item.toLowerCase().replace(' ', '-')} className="p-2 text-muted">
                <Nav.Item>{item}</Nav.Item>
              </Link>
            )}
          </Nav>
        </div>
        <Routes appProps={{ }} />
      </Container>
      <footer className="blog-footer">
        <p>
          <Link to="#home">Back to top</Link>
        </p>
      </footer>
    </div>
  );
}

export default App;
