import React from "react";
import MiniCalendar from "../../components/MiniCalender/MiniCalender";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
const Dashboard = () => {
  return (
    <div>
      <div className={styles.dashboard}>
        <div className={styles.content1}>
          {/* <MiniCalendar /> */}
          <div className={styles.content1Title}>
            <i class="bi bi-calendar-plus"></i>
            Today Task
          </div>
          <div className={styles.content2Title}>
            <p>
              IAMS is a web application that helps you manage your time and
              projects. With IAMS, you can track your time and projects, set
            </p>
          </div>
        </div>
        <div className="content2">
          <div className={styles.contentTitle2}>
            <i class="bi bi-calendar-plus"></i>
            Calendar
            <MiniCalendar />
          </div>
        </div>
      </div>
      {/* ----------------------------------------- */}

      <div className={styles.information}>
        <div className={styles.infor}>
          <div className={styles.infor1}>dd</div>
          <div className={styles.infor2}>dd</div>
          <div className={styles.infor3}>dd</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
