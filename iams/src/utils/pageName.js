// utils/pageName.js
export const getPageName = (path) => {
  const parts = path.split("/").filter(Boolean); // Tách đường dẫn và loại bỏ các phần trống
  const pageNames = [];

  console.log("Path parts:", parts); // Kiểm tra các phần của đường dẫn

  parts.forEach((part) => {
    switch (part) {
      case "dashboard":
        pageNames.push("Dashboard");
        break;
      case "dailyreport":
        pageNames.push("Daily Report");
        break;
      case "audit":
        pageNames.push("Audit");
        break;
      case "notification":
        pageNames.push("Notification");
        break;
      case "interns":
        pageNames.push("Intern Management");
        break;
      default:
        // Nếu phần là một ID, hiển thị tên trang chi tiết
        if (!isNaN(part)) {
          pageNames.push(`Intern Detail (ID: ${part})`);
        } else {
          pageNames.push("Page Not Found");
        }
        break;
    }
  });

  const pageName = pageNames.join(" > ");
  console.log("Generated Page Name:", pageName); // Kiểm tra tên trang cuối cùng
  return pageName;
};
