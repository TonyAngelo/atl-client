import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import { categoryNameColors } from "../libs/categories";

export default function SidebarPost({
  className = "",
  disabled = false,
  catagory = "",
  title = "",
  text = "",
  linkText = "Continue reading",
  link = "",
  ...props
}) {
  if(disabled) {
    return null;
  }
  
  return (
    <Card className="flex-md-row mb-4 box-shadow">
      <div className="card-body d-flex flex-column align-items-start">
        <strong className={"d-inline-block mb-2 " + categoryNameColors[catagory]}>{catagory}</strong>
        <h4 className="mb-2">
          <Link to={link} className="text-dark">{title}</Link>
        </h4>
        <div dangerouslySetInnerHTML={{ __html: text }} />
        <div className="text-right w-100 mt-2"><Link to={link}>Continue reading</Link></div>
      </div>
    </Card>
  );
}