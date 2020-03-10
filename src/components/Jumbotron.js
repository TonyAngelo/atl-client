import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from 'react-bootstrap';

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
    <Jumbotron className="p-3 p-md-5 text-white rounded bg-dark">
      <h1 className="display-4 font-italic">{title}</h1>
      {text !== "" ? <p className="lead my-3">{text}</p> : null}
      <p className="lead mb-0"><Link to={link} className="text-white font-weight-bold">{linkText}</Link></p>
    </Jumbotron>
  );
}