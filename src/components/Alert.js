import React from "react";
import { Alert } from 'react-bootstrap';

export default function MyAlert({
  className = "",
  disabled = false,
  variant = "danger",
  show = false,
  text = "",
  ...props
}) {
  if(disabled) {
    return null;
  }

  if(!show) {
    return null;
  }
  
  return (
    <Alert variant={variant}>
      {text}
    </Alert>
  );
}