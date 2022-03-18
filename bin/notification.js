/*
Notification page
1-On data receival from embedded system; the value is checked aganist a global threshold of the corresponding model
2-If it's within acceptable boundires it is saved only in its model, otherwise, the data is also saved in the notification model.
3-A global notification counter is incremented with each unread notification
4-The notification count is used to dispaly the number of unread notification on the navigation menu
5-Upon openning the notification page the newest notifacaitons are then fetched from the notification model
6-Newer data ara marked by their IDs where the last notification ID is stored in a variable and only the newer IDs are fetched
7-User can click on a new notification to mark it as read
8-When the notifiaction is marked as read the notification count is decremented by one
9-User can also dismiss read notification deleting them from the notificaiton page

------
update (read/unread) field upon user interaction, keep track of unread count, fetch count on each page load
*/ 

//send update to set read property to true
const updateNotification = (event) => {
  //get id of notification
  const id = event.target.getElementsByTagName("span")[0].innerHTML;
  fetch("/notification", {
    method: "PATCH", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors",
    body: JSON.stringify({ id: id, read: true })
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
//change notification css when read
const read = (event) => {
  event.target.classList.remove("alert");
  event.target.classList.add("read");
  event.target
    .getElementsByTagName("i")[0]
    .classList.remove(
      "fas",
      "fa-exclamation-triangle",
      "faa-flash",
      "animated"
    );
  event.target
    .getElementsByTagName("i")[0]
    .classList.add("fas", "fa-check-circle", "faa-tada", "animated");
};
//stops propagation of the read event from other elements
const stopPropagation = (event) => {
  event.stopPropagation();
};

//side note Cross origin error due to font awesome was due to the body not being in json format that's why json.stringify is used
//event handler when notificaiton is read
const handleUpdate = (event) => {
  //send update
  updateNotification(event);
  //change CSS
  read(event);
};

//removes notification from DOM when X is clicked
const dismiss = (event) => {
  event.target.parentElement.remove();
};
//event handler to remove notificaiton and marks it as read
const handleDelete = (event) => {
  //needed to stop notification (parent) handleUpdate from propagating to (child) dismiss button
  event.stopPropagation();
  updateNotification(event);
  dismiss(event);
};
//consturcts the notificaiton and appends it to the notification container
const appendNotification = (id, model, value, condition, deviation, date) => {
  let notification = document.createElement("div");
  notification.addEventListener("click", handleUpdate);
  notification.classList.add("notification", "alert", "column");
  notification.innerHTML = `<div onclick = "stopPropagation(event)"><span class ="id">${id}</span><strong><i class="fas fa-exclamation-triangle faa-flash animated"></i>&nbsp Alert! &nbsp</strong><br>Measured value <strong>${value}</strong> from <strong>${model}</strong> sensor is <strong>${condition}</strong> with deviation of <strong>${deviation}</strong>, time of reading <strong>${date}</strong>
      </div>
      <button onclick = " handleDelete(event)" class="dismiss-button far fa-times-circle"><span class ="id">${id}</span></button>`;
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  notificationContainer.prepend(notification);
};

//create request to notificaiton model
fetch(
  "/api/exportNotification/",
  {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json"
    },
    mode: "cors"
  }
)
  .then((response) => response.json())
  .then((data) => {
    //console.log("Success:", data);
    //check if response is empty show empty notification message
    if (data.length == 0) {
      let emptyNotification = document.createElement("div");
      emptyNotification.classList.add("notification", "read", "column");
      emptyNotification.innerHTML = `<div><i class="fas fa-check-circle faa-tada animated"></i>&nbsp All Clear!<br>No new notifications are available.</div>`;
      const notificationContainer = document.getElementById(
        "notification-container"
      );
      notificationContainer.prepend(emptyNotification);
    } else if (data.length != 0) {
      //start appending notificaiton from the response data
      data.map((x) => {
        //format the date
        let date = new Date(x.date);
        let dateString =
          date.toLocaleDateString() + " " + date.toLocaleTimeString();
        //start appending notifications
        appendNotification(
          x._id,
          x.model,
          x.value,
          x.condition,
          x.deviation,
          dateString
        );
      });
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });