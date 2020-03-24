import React from "react";
import { Image } from 'react-bootstrap';

export default function TiledSideAdBanner({
  className = "",
  disabled = false,
  ...props
}) {
  if(disabled) {
    return null;
  }
  
  return (
    <aside className="d-none d-lg-block col-lg-2 blog-sidebar">
      <Image className="mb-2" fluid src="https://via.placeholder.com/200x800" />
      <Image className="my-2" fluid src="https://via.placeholder.com/200x800" />
    </aside>
  );
}