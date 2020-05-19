import React from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { HashLink as Link } from 'react-router-hash-link';
import { Jumbotron, Button } from 'react-bootstrap';

export default function MyJumbotron({
  className = "",
  disabled = false,
  title = "",
  text = "",
  linkText = "",
  link = "",
  ...props
}) {
  if(disabled) {
    return null;
  }
  
  return (
    <Jumbotron className="p-3 p-md-5 text-white rounded">
      <h1 className="display-4 font-italic">{title}</h1>
      {text !== "" ? <p className="lead my-3">{text}</p> : null}
      {link !== "" 
        ? <div><Link to={link} className="jumbotronLink lead text-white font-weight-bold">
            {linkText}...
          </Link></div>
        : null
      }
    </Jumbotron>
  );
}