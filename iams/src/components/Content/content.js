import React from "react";
import styles from "../Content/content.module.css";

const Content = () => {
  return (
    <div className={styles.content}>
      <h2>Main Content Area</h2>
      <p>This is where the main content of your webpage will go.</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula
        diam non nulla vestibulum, et sodales leo efficitur. Donec ut velit vel
        erat fringilla venenatis non id arcu. Vestibulum consectetur, lacus sit
        amet ullamcorper volutpat, arcu sapien vestibulum justo, non tempus
        felis orci a augue.
      </p>
      <p>
        Suspendisse potenti. Sed faucibus, purus sit amet pharetra tincidunt,
        justo lacus scelerisque odio, a fermentum orci mauris non risus. Aliquam
        erat volutpat. Nam fermentum volutpat libero.
      </p>
      <p>
        Pellentesque a nisi eros. Vestibulum volutpat tincidunt odio, in
        tincidunt velit sollicitudin non. Cras vitae urna elit. Duis mollis
        purus a tellus condimentum, a pellentesque dolor faucibus.
      </p>
    </div>
  );
};

export default Content;
