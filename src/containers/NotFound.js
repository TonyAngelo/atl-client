import React from "react";
import StandardHelmet from "../components/StandardHelmet";
import MyJumbotron from "../components/Jumbotron";
//import "./NotFound.css";

export default function NotFound() {
  return (
  	<div>
	  	<StandardHelmet 
	        title={"Page Not Found"}
	        link={"https://atlantis.fyi/notfound"} 
	    />
	    <MyJumbotron 
	        title = "Like Atlantis, the page you are looking for could not be found!"
	        linkText = "Try the home page."
	        link = "/"
	      >
	  	</MyJumbotron>
	 </div>
  );
}