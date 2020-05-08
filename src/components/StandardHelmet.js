import React from "react";
import {Helmet} from "react-helmet";
import { defaultDescription } from "../libs/seo";
import { xmlParse } from "../libs/xml-parse";
//import "./PageTitle.css";

export default function StandardHelmet({
  isLoading,
  className = "",
  title = "",
  link = "",
  description = "",
  disabled = false,
  ...props
}) {
  if(disabled || isLoading) {
    return null;
  }
  return (
    <Helmet>
      <title>{title.length > 0 ? xmlParse(title) + " | Atlantis FYI" : "Atlantis FYI"}</title>
      <link rel="canonical" href={link} />
      <meta name="description" content={description.length > 0 ? xmlParse(description) : defaultDescription} />
    </Helmet>
  );
}