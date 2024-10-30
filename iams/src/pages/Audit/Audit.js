// src/pages/About.js
import React from "react";
import { useLocation } from "react-router-dom";
// import { getPageName } from "../../utils/pageName";
import { Link } from "react-router-dom";

const Audit = () => {
  const location = useLocation();
  // const pageName = getPageName(location.pathname);

  return (
    <div>
      <div>{/* <Link to="/">IAMS </Link> >>{pageName}{" "} */}</div>
      <h2>Audit </h2>
      <p>This is the About Page where you can learn more about us.</p>
    </div>
  );
};

export default Audit;
