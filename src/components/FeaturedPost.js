import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, Badge, Row } from 'react-bootstrap';
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
          <div className="d-inline-flex flex-row justify-content-between w-100 mb-2">
              <div><strong className={"mb-2 " + categoryColors[category]}>{categoryNames[category]}</strong></div>

              <div><Badge className="featuredLabel corner-ribbon p-2" variant={"primary"}>Featured</Badge></div>
          </div>
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