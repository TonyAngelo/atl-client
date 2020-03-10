import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

export default function SidebarPost({
  className = "",
  disabled = false,
  catagory = "",
  title = "",
  date = "",
  text = "",
  linkText = "Continue reading",
  link = "",
  ...props
}) {
  if(disabled) {
    return null;
  }

  const catagoryColors = {
    'Theory': 'text-primary',
    'Source': 'text-success',
    'Person': 'text-warning',
    'Plato': 'text-info',
    'Catastrophism': 'text-danger',
    'Question': 'text-secondary'
  }
  
  return (
    <Card className="flex-md-row mb-4 box-shadow">
      <div className="card-body d-flex flex-column align-items-start">
        <strong className={"d-inline-block mb-2 " + catagoryColors[catagory]}>{catagory}</strong>
        <h4 className="mb-0">
          <Link to={link} className="text-dark">{title}</Link>
        </h4>
        <div className="mb-1 text-muted">{date}</div>
        <p className="card-text mb-auto">{text}</p>
        <div className="text-right w-100 mt-2"><Link to={link}>Continue reading</Link></div>
      </div>
    </Card>
  );
}