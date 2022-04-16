const sendNotification = (title, body) => {
  const notification = new Notification(title, {
    body,
    icon: "https://i.ibb.co/WnWwXFg/NPM-02.jpg",
  });
  notification.onclick = () => {
    window.location.reload();
  };
};

const realNotifications = (func) => {
  if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        func();
      }
    });
  } else if (Notification.permission === "granted") {
    func();
  }
};

export default realNotifications;
export { sendNotification };
