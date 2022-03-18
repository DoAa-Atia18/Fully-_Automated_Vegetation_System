const root = document.documentElement;
const scrollUpButton = document.getElementById("scroll-up-button");
const nav = document.getElementById("nav");
const menuButton = document.getElementById("menu");
const modal = document.getElementById("modal");
const closeButton = document.getElementById("close");
// function to bring button up to the top
const scrollUp = () => {
  root.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};
scrollUpButton.addEventListener("click", scrollUp);
//shows button after 20% of scroll height
const handleScroll = () => {
  var scrollTotal = root.scrollHeight - root.clientHeight;
  //console.log(scrollTotal, root.scrollTop);
  if (root.scrollTop / scrollTotal >= 0.2) {
    scrollUpButton.classList.add("show-scroll-button");
  } else {
    scrollUpButton.classList.remove("show-scroll-button");
  }
};

let previousScrollValue = root.scrollTop; //store value of previous scroll height then compare it with current scroll height to determine upward or downward movement
//makes button disappear when scrolling updwards and appear when scrolling beyond 20% of scroll height
const handelPosNegScroll = () => {
  var scrollTotal = root.scrollHeight - root.clientHeight;

  if (
    root.scrollTop > previousScrollValue &&
    root.scrollTop / scrollTotal >= 0.2
  ) {
    scrollUpButton.classList.add("show-scroll-button");
    nav.classList.add("hide-nav");
  } else {
    scrollUpButton.classList.remove("show-scroll-button");
    nav.classList.remove("hide-nav");
  }
  previousScrollValue = root.scrollTop;
};
document.addEventListener("scroll", handelPosNegScroll);
function handleClick() {
  if (modal.style.left != "0vw") {
    modal.style.left = "0vw";
    modal.style.background = "hsla(272, 13%, 6%, 0.5)";
  } else {
    modal.style.left = "-100vw";
    modal.style.background = "none";
  }
}
modal.addEventListener("click", (event) => {
  if (event.target == modal && modal.style.left == "0vw") {
    modal.style.left = "-100vw";
    modal.style.background = "none";
  }
});
closeButton.addEventListener("click", handleClick);
menu.addEventListener("click", handleClick);

//part for updating notification counter
window.addEventListener("load",()=>{

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
  let countArr = document.getElementsByClassName("notification-count")

   
    if(data.length > 0){
   let countArr = document.getElementsByClassName("notification-count")

   
   for(let i = 0; i < countArr.length; i++){
     countArr[i].innerHTML = data.length;
     countArr[i].style.setProperty("visibility","visible");
   }
    }
    else{

   for(let i = 0; i < countArr.length; i++){
    countArr[i].style.setProperty("visibility","hidden");
   }
    
    }
  
  })
})

const TemperatureThreshold = { min: 20, max: 50 };
const PHThreshold = { min: 6, max: 8 };
const ElectricThreshold = { min: 10, max: 30 };
const OuterTempThreshold = { min: 15, max: 35 };
const HumidityThreshold = { min: 30, max: 100 };



const checkTreshold = (value, thresholdObj) => {
  if (value >= thresholdObj.min && value <= thresholdObj.max) {
    return true;
  } else return false;
};
//function to change color of status box based on threshold condition
const colorStatusBox = (statusBox, condition) => {
  if (condition) {
    statusBox.classList.add("clear");
  } else {
    statusBox.classList.add("alert");
  }
};

//fetch data of each sensor and append it as a quick status
const fetchStatus = ()=>{
  const abbreviation = ["Temp", "PH", "EC", "OuterTemp","Humidity"];
  const models = ["Temperature", "PH", "ElectricConductivity", "OuterTemp","Humidity"];
  Promise.all([
    fetch(
      "/api/exportData/",
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",

        body: JSON.stringify({
          modelName: models[0],
          minDate: "01/01/1970",
          maxDate: "01/01/2222",
          pageNu: 0,
          limit: 1,
          minValue: 0,
          maxValue: 1000
        })
      }
    ),
    fetch(
      "/api/exportData/",
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",

        body: JSON.stringify({
          modelName: models[1],
          minDate: "01/01/1970",
          maxDate: "01/01/2222",
          pageNu: 0,
          limit: 1,
          minValue: 0,
          maxValue: 1000
        })
      }
    ),
    fetch(
      "/api/exportData/",
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",

        body: JSON.stringify({
          modelName: models[2],
          minDate: "01/01/1970",
          maxDate: "01/01/2222",
          pageNu: 0,
          limit: 1,
          minValue: 0,
          maxValue: 1000
        })
      }
    ), fetch(
      "/api/exportData/",
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",

        body: JSON.stringify({
          modelName: models[3],
          minDate: "01/01/1970",
          maxDate: "01/01/2222",
          pageNu: 0,
          limit: 1,
          minValue: 0,
          maxValue: 1000
        })
      }
    ), fetch(
      "/api/exportData/",
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",

        body: JSON.stringify({
          modelName: models[4],
          minDate: "01/01/1970",
          maxDate: "01/01/2222",
          pageNu: 0,
          limit: 1,
          minValue: 0,
          maxValue: 1000
        })
      }
    )
  ])
    .then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .then(function (data) {
      const statusBoxes = document.getElementsByClassName("status-box");
      //console.log(data);
      for (let i = 0; i < statusBoxes.length; i++) {
        statusBoxes[i].innerHTML = `<ul>
    <li>Sensor: ${abbreviation[i]}</li>
    <li>Reading: ${data[i][0].value}</li>
    <li>Time: ${new Date(data[i][0].date).toLocaleDateString()}</li>
    </ul>`;
        //check if value is within threshold
        if (abbreviation[i] == "Temp") {
          colorStatusBox(
            statusBoxes[i],
            checkTreshold(data[i][0].value, TemperatureThreshold)
          );
        } else if (abbreviation[i] == "PH") {
          colorStatusBox(
            statusBoxes[i],
            checkTreshold(data[i][0].value, PHThreshold)
          );
        } else if (abbreviation[i] == "EC") {
          colorStatusBox(
            statusBoxes[i],
            checkTreshold(data[i][0].value, ElectricThreshold)
          );
        }
        else if (abbreviation[i] == "OuterTemp"){
          colorStatusBox(
            statusBoxes[i],
            checkTreshold(data[i][0].value, OuterTempThreshold)
          );
        }
        else if (abbreviation[i] == "Humidity"){
          colorStatusBox(
            statusBoxes[i],
            checkTreshold(data[i][0].value, HumidityThreshold)
          );
        }
      }
      
    })
    .catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });
}
fetchStatus();