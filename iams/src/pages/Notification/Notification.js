import React, { useState, useEffect } from "react";
import styles from "./Notification.module.css"; // Import CSS module
import { Link, useLocation } from "react-router-dom";
import { getPageName } from "../../utils/pageName";
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();
  const pageName = getPageName(location.pathname);

  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        message: "Your profile was updated successfully.",
        timestamp: "2024-10-24 12:34:56",
        type: "success",
      },
      {
        id: 2,
        message: "Your password will expire in 3 days.",
        timestamp: "2024-10-23 09:45:21",
        type: "warning",
      },
      {
        id: 3,
        message: "A new comment was added to your post.",
        timestamp: "2024-10-22 14:11:02",
        type: "info",
      },
      {
        id: 4,
        message: "There was an error processing your request.",
        timestamp: "2024-10-22 11:22:33",
        type: "error",
      },
    ];

    setNotifications(mockNotifications);
  }, []);

  return (
    <div className={styles.notificationContainer}>
      <div>
        <Link to="/">IAMS </Link> >> {pageName}
      </div>
      {notifications.length > 0 ? (
        <ul className={styles.notificationList}>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`${styles.notification} ${styles[notification.type]}`}
            >
              <p>{notification.message}</p>
              <small>{notification.timestamp}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default Notification;
