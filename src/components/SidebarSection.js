import React from "react";
import SidebarTitle from "../components/SidebarTitle";
import SidebarPost from "../components/SidebarPost";

export default function SidebarSection({
  className = "",
  disabled = false,
  data = [],
  titleSingle = "",
  titleMultiple = "",
  linkPath = null,
  ...props
}) {
  if(disabled) {
    return null;
  }
  let path;
  if(linkPath){
    path = linkPath;
  } else {
    path = titleMultiple.toLowerCase()
  }
  
  return (
    <div>
      <SidebarTitle>{data.length > 1 ? "Relevant " + titleMultiple : "Relevant " + titleSingle}</SidebarTitle>
      {data.sort(function(a, b) {
          var dateA = new Date(a.post_date), dateB = new Date(b.post_date);
          return dateB - dateA;
        }).map((item, index) =>
        <SidebarPost
          key = {index}
          title = {item.post_title}
          text = {item.post_excerpt}
          link = {"/" + path + "/" + item.post_name}
          linkText = "Go to page">
        </SidebarPost>)}
    </div>
  );
}