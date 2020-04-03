import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  RedditIcon,
  TwitterIcon,
} from "react-share";
//import "./PageTitle.css";

export default function SocialShare({
  isLoading,
  className = "",
  disabled = false,
  link = "",
  title = "",
  ...props
}) {
  if(disabled || isLoading) {
    return null;
  }
  
  return (
    <div>
      <FacebookShareButton
        url={link}
        quote={title}
        className="mr-2"
      ><FacebookIcon size={48} round /></FacebookShareButton>
      <TwitterShareButton
        url={link}
        title={title}
        className="mr-2"
      ><TwitterIcon size={48} round /></TwitterShareButton>
      <RedditShareButton
        url={link}
        title={title}
        className="mr-2"
      ><RedditIcon size={48} round /></RedditShareButton>
      <EmailShareButton
        url={link}
        subject={title}
        body={""}
        className="mr-2"
      ><EmailIcon size={48} round /></EmailShareButton>
    </div>
  );
}