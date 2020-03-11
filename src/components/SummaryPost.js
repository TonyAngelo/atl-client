import React from "react";
import { Link } from "react-router-dom";
//import { Card } from 'react-bootstrap';
import { categoryColors, categoryNames } from "../libs/categories";

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
  
  return (
    <div className="blog-post">
      <strong className={"d-inline-block mb-2 " + categoryColors[catagory]}>{categoryNames[catagory]}</strong>
      <h2 className="blog-post-title">{title}</h2>
      <p className="blog-post-meta">{date}</p>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <div className="text-right"><Link to={link}>Continue reading</Link></div>
    </div>
  );
}