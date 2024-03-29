import React from "react";
import { Link } from "react-router-dom";
import { searchColors, searchNames } from "../libs/categories";
import { months } from "../libs/dates";

export default function SearchPost({
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
      <strong className={"d-inline-block mb-2 " + searchColors[category]}>{searchNames[category]}</strong>
      <h2 className="blog-post-title">
        <Link to={link} className="text-dark"><div dangerouslySetInnerHTML={{ __html: title }} /></Link>
      </h2>
      <p className="blog-post-meta">{months[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear()}</p>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      <div className="mr-4 text-right"><Link to={link}>Continue reading</Link></div>
    </div>
  );
}