import React from "react";
import { Link } from "react-router-dom";
//import { Card } from 'react-bootstrap';

export default function SummaryPost({
  className = "",
  disabled = false,
  catagory = "",
  title = "",
  date = "",
  text = "",
  linkText = "Continue reading",
  link = "",
  ...props
}) {
  if(disabled) {
    return null;
  }

  const catagoryColors = {
    'Theory': 'text-primary',
    'Source': 'text-success',
    'Person': 'text-warning',
    'Plato': 'text-info',
    'Catastrophism': 'text-danger',
    'Question': 'text-secondary'
  }
  
  return (
    <div className="blog-post">
      <strong className={"d-inline-block mb-2 " + catagoryColors[catagory]}>{catagory}</strong>
      <h2 className="blog-post-title">{title}</h2>
      <p className="blog-post-meta">{date}</p>
      <p>{text}</p>
      <div className="text-right"><Link to={link}>Continue reading</Link></div>
    </div>
  );
}