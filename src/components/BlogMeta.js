import React from "react";
import { months } from "../libs/dates";
//import "./PageTitle.css";

export default function BlogMeta({
  isLoading,
  className = "",
  disabled = false,
  category = "",
  date = "",
  edited = "",
  author = "",
  ...props
}) {
  if(disabled || isLoading) {
    return null;
  }

  const myDate = new Date(date);
  const myEdit = new Date(edited);

  return (
    <p className="font-italic blog-post-meta">
      by {author}
      <br/>
      Published {months[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear()} 
      <br/>
      Revised {months[myEdit.getMonth()] + " " + myEdit.getDate() + ", " + myEdit.getFullYear()}
    </p>
  );
}