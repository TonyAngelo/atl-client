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
          var dateA = new Date(a.date), dateB = new Date(b.date);
          return dateB - dateA;
        }).map((item, index) =>
        <SidebarPost
          key = {index}
          title = {item.title.rendered}
          text = {item.excerpt.rendered}
          link = {"/" + path + "/" + item.slug}
          linkText = "Go to page">
        </SidebarPost>)}
    </div>
  );
}