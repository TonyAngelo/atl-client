import React from "react";
//import "./PageTitle.css";

export default function BlogFooter({
  isLoading,
  className = "",
  disabled = false,
  category = "",
  tags = [],
  ...props
}) {
  if(disabled || isLoading) {
    return null;
  }

  return (
    <div className="blog-post-footer my-4">
      <p>Category: <a href={"/blog/category/" + category.slug}>{category.name}</a>
      <br/>
      Tags: {tags.length > 0 ? tags.map((item, index) => <span key={index}><a href={"/blog/category/" + item.slug}>{item.name}</a>{index+1 < tags.length ? ", " : ""}</span>) : "no tags"}</p>
    </div>
  );
}