import React from "react";
import MyJumbotron from "../components/Jumbotron";
//import "./NotFound.css";

export default function NotFound() {
  return (
    <MyJumbotron 
        title = "Like Atlantis, the page you are looking for could not be found!"
        linkText = "Try the home page."
        link = "/"
      >
  	</MyJumbotron>
  );
}