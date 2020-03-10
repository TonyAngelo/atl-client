import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Jumbotron, Card } from 'react-bootstrap';
import MyJumbotron from "../components/Jumbotron";
import FeaturedPost from "../components/FeaturedPost";
import SummaryPost from "../components/SummaryPost";
import SidebarPost from "../components/SidebarPost";
//import "./Home.css";

export default function Home() {
  return (
    <main>
      <MyJumbotron 
        title = "The Atlantis Finder"
        text = "A step by step decision tree that leads you to the location of Atlantis."
        linkText = "Check it out!"
        link = "/finder"
      ></MyJumbotron>

  	  <Row className="mb-2">
  	    <Col md={6}>
          <FeaturedPost
            catagory = "Theory"
            title = "A New Theory"
            date = "Nov 15, 2019"
            text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed mi lacus. Curabitur tempor laoreet urna ut sodales. Phasellus eleifend magna a purus congue varius. Phasellus vel fermentum orci. Quisque congue luctus metus, ut luctus diam ultrices at. In hac habitasse platea dictumst. Mauris quis lectus ac sapien scelerisque tincidunt."
            link = "/theories/a-new-theory"
          ></FeaturedPost>
  	    </Col>
  	    <Col md={6}>
          <FeaturedPost
            catagory = "Plato"
            title = "Plato the Pythagorean"
            date = "Nov 12, 2019"
            text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed mi lacus. Curabitur tempor laoreet urna ut sodales. Phasellus eleifend magna a purus congue varius. Phasellus vel fermentum orci. Quisque congue luctus metus, ut luctus diam ultrices at. In hac habitasse platea dictumst. Mauris quis lectus ac sapien scelerisque tincidunt."
            link = "/plato/plato-the-pythagorean"
          ></FeaturedPost>
  	    </Col>
  	  </Row>

	    <Row>
	      <Col md={8} className="blog-main">
	        <h3 className="pb-3 my-4 font-italic border-bottom">
	          Discourse
	        </h3>
          <SummaryPost
            catagory = "Question"
            title = "Bigger than Lybia and Asia?"
            date = "Nov 11, 2019"
            text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed mi lacus. Curabitur tempor laoreet urna ut sodales. Phasellus eleifend magna a purus congue varius. Phasellus vel fermentum orci. Quisque congue luctus metus, ut luctus diam ultrices at. In hac habitasse platea dictumst. Mauris quis lectus ac sapien scelerisque tincidunt."
            link = "/question/bigger-than-lybia-asia"
          ></SummaryPost>
	        
          <SummaryPost
            catagory = "Theory"
            title = "Was Atlantis in Spain?"
            date = "Nov 9, 2019"
            text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed mi lacus. Curabitur tempor laoreet urna ut sodales. Phasellus eleifend magna a purus congue varius. Phasellus vel fermentum orci. Quisque congue luctus metus, ut luctus diam ultrices at. In hac habitasse platea dictumst. Mauris quis lectus ac sapien scelerisque tincidunt."
            link = "/theory/was-atlantis-in-spain"
          ></SummaryPost>

	        <SummaryPost
            catagory = "Catastrophism"
            title = "The History of Catastrophism"
            date = "Nov 8, 2019"
            text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed mi lacus. Curabitur tempor laoreet urna ut sodales. Phasellus eleifend magna a purus congue varius. Phasellus vel fermentum orci. Quisque congue luctus metus, ut luctus diam ultrices at. In hac habitasse platea dictumst. Mauris quis lectus ac sapien scelerisque tincidunt."
            link = "/catastrophism/history-of-catastrophism"
          ></SummaryPost>

          <SummaryPost
            catagory = "Plato"
            title = "Who was Plato"
            date = "Nov 6, 2019"
            text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed mi lacus. Curabitur tempor laoreet urna ut sodales. Phasellus eleifend magna a purus congue varius. Phasellus vel fermentum orci. Quisque congue luctus metus, ut luctus diam ultrices at. In hac habitasse platea dictumst. Mauris quis lectus ac sapien scelerisque tincidunt."
            link = "/plato/who-was-plato"
          ></SummaryPost>

          <SummaryPost
            catagory = "Question"
            title = "Did the Greeks know about the Americas?"
            date = "Nov 3, 2019"
            text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed mi lacus. Curabitur tempor laoreet urna ut sodales. Phasellus eleifend magna a purus congue varius. Phasellus vel fermentum orci. Quisque congue luctus metus, ut luctus diam ultrices at. In hac habitasse platea dictumst. Mauris quis lectus ac sapien scelerisque tincidunt."
            link = "/question/did-greeks-know-about-americas"
          ></SummaryPost>

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