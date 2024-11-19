export const getPageName = (path) => {
  const parts = path.split("/").filter(Boolean); // Tách đường dẫn và loại bỏ các phần trống
  const pageNames = [];

  console.log("Path parts:", parts);

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
      case "intern":
        pageNames.push("Intern Management");
        break;
      case "profile":
        pageNames.push("Profile");
        break;

      default:
        pageNames.push(part);
    }
  });

  const pageName = pageNames.join(" > ");
  console.log("Generated Page Name:", pageName);
  return pageName;
};
