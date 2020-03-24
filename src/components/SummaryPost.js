import React from "react";
import { Link } from "react-router-dom";
import { categoryColors, categoryNames } from "../libs/categories";
import { months } from "../libs/dates";

export default function SummaryPost({
  className = "",
  disabled = false,
  index = 0,
  category = "",
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

  const myDate = new Date(date);

  return (
    <div id={index === 5 ? "more" : index} className="blog-post">
      <strong className={"d-inline-block mb-2 " + categoryColors[category]}>{categoryNames[category]}</strong>
      <h2 className="blog-post-title">{title}</h2>
      <p className="blog-post-meta">{months[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear()}</p>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <div className="mr-4 text-right"><Link to={link}>Continue reading</Link></div>
    </div>
  );
}