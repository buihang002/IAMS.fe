import React from "react";
import { useLocation } from "react-router-dom";
import { getPageName } from "../../utils/pageName";
import { Link } from "react-router-dom";
const Contact = () => {
  const location = useLocation();
  const pageName = getPageName(location.pathname);

  return (
    <div>
      <div>{/* <Link to="/">IAMS </Link> >> {pageName}{" "} */}</div>
      <h2>Contact Us</h2>
      <p>This is the Contact Page where you can reach us.</p>
      <p>This is the Contact Page where you can reach us.</p>
    </div>
  );
};

export default Contact;
