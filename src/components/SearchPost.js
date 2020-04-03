import React from "react";
import { Link } from "react-router-dom";

export default function SearchPost({
  className = "",
  disabled = false,
  title = "",
  linkText = "Continue reading",
  link = "",
  ...props
}) {
  if(disabled) {
    return null;
  }

  return (
    <div className="blog-post">
      <h2 className="blog-post-title">
        <Link to={link} className="text-dark"><div dangerouslySetInnerHTML={{ __html: title }} /></Link>
      </h2>
      <div className="mr-4 text-right"><Link to={link}>Go to page</Link></div>
    </div>
  );
}