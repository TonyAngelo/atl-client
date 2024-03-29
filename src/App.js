import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import { LinkContainer } from 'react-router-bootstrap'
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import { Container, Row, Col, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Routes from "./Routes";
import { defaultDescription } from "./libs/seo";
import {Helmet} from "react-helmet";
import { headerCategories } from "./libs/categories";

import './App.css';

const trackingId = "UA-165953822-1";
ReactGA.initialize(trackingId);
const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

function App(props) {
  const [currentYear, setCurrentYear] = useState(2020);
  const [isLoaded, setIsLoaded] = useState([]);
  //const [navKey, setNavKey] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  // const headerCatagories = [
  //   'Blog', 'Theories', 'Sources', 'People', 'Plato', 'About', 'Contact'
  // ];

  useEffect(() => {
    async function onLoad() {
      let d = new Date
      setCurrentYear(d.getYear()+1900);
    }
    onLoad();
  }, []);

  async function handleSearchSubmit(e) {
    e.preventDefault();
    //console.log(search);
    setShowSearch(false);
    props.history.push("/search/" + search);
  }

  return (
    <div id="home">
      <Helmet>
        <title>Atlantis FYI</title>
        <link rel="canonical" href="https://atlantis.fyi" />
        <meta name="description" content={defaultDescription} />
      </Helmet>
      <Container className="mb-4">
        <header className="blog-header py-3">
          <Row className="flex-nowrap justify-content-between align-items-center">
            <Col md={4} className="d-none d-md-block pt-1">
              <p></p>
            </Col>
            <Col md={4} className="text-center">
              <Link className="blog-header-logo text-dark" to="/">Atlantis FYI</Link>
            </Col>
            <Col md={4} className="d-flex justify-content-end align-items-center">
                {showSearch
                  ? <Form inline>
                      <Form.Group controlId="formSearch">
                        <FormControl 
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                          onKeyPress={e => {
                            if (e.key === "Enter") {
                              handleSearchSubmit(e);
                            }
                          }}
                          size="sm" 
                          type="text" 
                          placeholder="Search" 
                          className="mr-sm-2" 
                        />
                      </Form.Group>
                    </Form>
                  : null
                }
                {!showSearch
                  ? <Button onClick={() => setShowSearch(!showSearch)} className="search-button" variant="outline-dark" size="sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-3"><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line></svg>
                    </Button>
                  : null
                }
            </Col>
          </Row>
        </header>
        <div className="nav-scroller py-1 mb-2">
          <Nav variant="pills" className="d-flex justify-content-between">
            {headerCategories.map((item, index) => 
              <LinkContainer key={index} to={"/" + item.toLowerCase().replace(' ', '-')}><Nav.Link active={false} className="p-2 text-muted">{item}</Nav.Link></LinkContainer>
            )}
          </Nav>
        </div>
        <Routes appProps={{ isLoaded, setIsLoaded }} />
      </Container>
      <footer className="blog-footer">
        <div><Link to="#home">Back to top</Link></div>
        <div className="blog-header-logo text-dark">Atlantis FYI</div>
        <Nav variant="pills" className="d-flex justify-content-center">
          {headerCategories.map((item, index) => 
            <LinkContainer key={index} to={"/" + item.toLowerCase().replace(' ', '-')}><Nav.Link active={false} className="p-2 text-muted">{item}</Nav.Link></LinkContainer>
          )}
        </Nav>
        <div className="footerCopyright">© {currentYear} atlantis.fyi</div>
      </footer>
    </div>
  );
}

export default withRouter(App);
