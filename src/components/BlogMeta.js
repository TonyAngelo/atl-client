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
    <p className="ml-4 font-italic blog-post-meta">
      by {author}
      <br/>
      on {months[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear()} 
      {edited.length > 0
        ? <div><br/>
          {"Revised " + months[myEdit.getMonth()] + " " + myEdit.getDate() + ", " + myEdit.getFullYear()}</div>
        : null
      }
    </p>
  );
}