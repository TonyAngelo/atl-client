import React from "react";
import { Row, Col } from "react-bootstrap";
//import "./PageTitle.css";

export default function SidebarTitle({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  if(disabled || isLoading) {
    return null;
  }
  return (
    <div className={`p-3 mb-3 bg-secondary rounded text-center ${className}`}>
      <h4 className="font-italic text-white" dangerouslySetInnerHTML={{ __html: props.children }} />
    </div>
  );
}