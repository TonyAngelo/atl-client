import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import { categoryNameColors } from "../libs/categories";

export default function SidebarDialogue({
  className = "",
  disabled = false,
  category = "",
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
        {category.length > 0 
          ? <strong className={"d-inline-block mb-2 " + categoryNameColors[category]}>{category}</strong> 
          : null
        }
        <h4 className="mb-2">
          <Link to={link} className="text-dark">{title}</Link>
        </h4>
        <p>{text}</p>
        <div className="text-right w-100 mt-2"><Link to={link}>{linkText}</Link></div>
      </div>
    </Card>
  );
}