import React from "react";
import { Figure } from "react-bootstrap";
import { cdnRewrite } from "../libs/cdn-rewrite";
//import "./PageTitle.css";

export default function FeaturedImage({
  isLoading,
  className = "",
  disabled = false,
  url = "",
  caption = "",
  ...props
}) {
  if(disabled || isLoading) {
    return null;
  }
  return (
    <div className="text-center"><Figure className="mb-2">
      <Figure.Image src={cdnRewrite(url)} fluid rounded />
      <Figure.Caption dangerouslySetInnerHTML={{ __html: caption }} />
    </Figure></div>
  );
}