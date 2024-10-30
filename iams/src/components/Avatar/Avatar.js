import React from "react";
import styles from "./avatar.module.css"; // Giả sử bạn có file CSS modules cho Avatar

const Avatar = ({ src, alt, size }) => {
  return (
    <div className={styles.avatar} style={{ width: size, height: size }}>
      <img src={src} alt={alt} className={styles.avatarImage} />
    </div>
  );
};

Avatar.defaultProps = {
  src: "https://via.placeholder.com/150",
  alt: "Avatar",
  size: "50px",
};

export default Avatar;
