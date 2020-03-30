import React from "react";
import { Link } from "react-router-dom";
import { Col, Card } from 'react-bootstrap';
import { categoryColors, categoryNames } from "../libs/categories";
import { months } from "../libs/dates";

export default function FeaturedPost({
  className = "",
  disabled = false,
  category = "",
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

  const myDate = new Date(date);
  
  return (
    <Col md={6}>
      <Card className="flex-md-row mb-4 box-shadow">
        <div className="card-body d-flex flex-column align-items-start">
          <strong className={"d-inline-block mb-2 " + categoryColors[category]}>{categoryNames[category]}</strong>
          <h3 className="mb-0">
            <Link to={link} className="text-dark"><div dangerouslySetInnerHTML={{ __html: title }} /></Link>
          </h3>
          <div className="mb-1 text-muted">{months[myDate.getMonth()] + " " + myDate.getDate() + ", " + myDate.getFullYear()}</div>
          <div dangerouslySetInnerHTML={{ __html: text }} />
          <div className="text-right w-100 mt-2"><Link to={link}>Continue reading</Link></div>
        </div>
      </Card>
    </Col>
  );
}