import React from "react";
//import "./PageTitle.css";

export default function BlogContent({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  if(disabled || isLoading) {
    return null;
  }
  return (
    <div className="html-content" dangerouslySetInnerHTML={{ __html: props.children }} />
  );
}