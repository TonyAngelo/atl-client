import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import { categoryNameColors } from "../libs/categories";

export default function TiledPost({
  className = "",
  disabled = false,
  category = "",
  title = "",
  text = "",
  date = "",
  author = "",
  linkText = "Continue reading",
  link = "",
  ...props
}) {
  if(disabled) {
    return null;
  }

  const myDate = new Date(date);
  
  return (
    <Card className="flex-md-row mb-4 box-shadow">
      <div className="card-body d-flex flex-column align-items-start">
        {category.length > 0 
          ? <strong className={"d-inline-block mb-2 " + categoryNameColors[category]}>{category}</strong> 
          : null
        }
        <h4 className="mb-2">
          <Link to={link} className="text-dark" dangerouslySetInnerHTML={{ __html: title }} />
        </h4>
        {author.length > 0
          ? <div className="mb-1 text-muted">by {author}</div>
          : null
        }
        {date.length > 0 && myDate.getFullYear() > 1
          ? <div className="mb-1 text-muted">in {myDate.getFullYear()}</div>
          : null
        }
        <div dangerouslySetInnerHTML={{ __html: text }} />
        <div className="text-right w-100 mt-2"><Link to={link}>{linkText}</Link></div>
      </div>
    </Card>
  );
}