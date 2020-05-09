import React from "react";
import SocialShare from "../components/SocialShare";
//import "./PageTitle.css";

export default function BlogFooter({
  isLoading,
  className = "",
  disabled = false,
  title = "",
  category = [],
  tags = [],
  meta = true,
  ...props
}) {
  if(disabled || isLoading) {
    return null;
  }
  return (
    <div className="blog-post-footer my-4">
      {meta
        ? <p>
            Categories: {category.length > 0 ? category.map((item, index) => <span key={index}><a href={"/blog/category/" + item.slug}>{item.name}</a>{index+1 < category.length ? ", " : ""}</span>) : "no categories"}
            <br/>
            Tags: {tags.length > 0 ? tags.map((item, index) => <span key={index}><a href={"/blog/tag/" + item.slug}>{item.name}</a>{index+1 < tags.length ? ", " : ""}</span>) : "no tags"}
          </p>
        : null
      }
      <SocialShare
        link={window.location.href}
        title={title}
      />
    </div>
  );
}