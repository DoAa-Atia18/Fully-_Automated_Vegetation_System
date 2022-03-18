//graph values theshold are imported from navigation.js file
//const TemperatureThreshold = { min: 20, max: 50 }
const TemperatureTitles = { x: "Date", y: "Degree Celsius °C" }
//const PHThreshold = { min: 6, max: 8 }
const PHTitles = { x: "Date", y: "PH Level" }
//const ElectricThreshold = { min: 10, max: 30 }
const ElectricTitles = { x: "Date", y: "Electric Conductivity mV" }


//page number
let pageNu  = 0;

//check which graph radio is checked
const checkCheckedRadio = () => {
  const radioDiv = document.getElementById('radio-div')
  var htmlCollection = radioDiv.getElementsByTagName("input");
  //console.log(htmlCollection)
  //you can't use filter on an htmlCollection must convert it into a normal array
  var radioButtonsArray = [...htmlCollection]
  var checkedRadio = radioButtonsArray.filter(radio => radio.checked)
  //console.log("Checked radio button is :", checkedRadio[0].value)
  return checkedRadio[0]
}


//assign data of graph based on radio check
const assignGraphData = (dataSet) => {
  const checkedRadio = checkCheckedRadio()
  const checkedRadioValue = checkedRadio.value;
  if (checkedRadioValue == "Temperature") {
    return graph(dataSet, TemperatureThreshold, TemperatureTitles)
  }
  else if (checkedRadioValue == "PH") {
    return graph(dataSet, PHThreshold, PHTitles)

  }
  else if (checkedRadioValue == "ElectricConductivity") {
    return graph(dataSet, ElectricThreshold, ElectricTitles)

  }
}
//get the last and first dates inside rects to get whatever data is less than them
const getDates = () => {
  const svg = d3.select("#svg-graph")
  const lastRectDate = svg.attr("max-date")
  const firstRectDate = svg.attr("min-date")
  //console.log("first rect value", firstRectDate, "last rect  value", lastRectDate)
  return { lastRectDate: lastRectDate, firstRectDate: firstRectDate }
}
//construct payload based on user choices, last and first buttons have been removed in this itteration
const constructPayload = (event) => {
  let data = null;
  let checkedRadioValue = checkCheckedRadio().value;
  let formData = getFormData();
  if (event.target.id == "previous-button") {
    pageNu += 1;
    //construct body of post
    data = Object.assign({},formData,{modelName:checkedRadioValue},{pageNu:pageNu})
  }
  else if (event.target.id == "next-button") {
    pageNu -= 1;
    data = Object.assign({},formData,{modelName:checkedRadioValue},{pageNu:pageNu})
  }
  else if (event.target.id == "last-button") {
    data = { action: "last", modelName: checkedRadioValue, minDate: dateObj.firstRectDate, maxDate: dateObj.lastRectDate }

  }
  else if (event.target.id == "first-button") {
    data = { action: "first", modelName: checkedRadioValue, minDate: dateObj.firstRectDate, maxDate: dateObj.lastRectDate }

  }
  //console.log(data)
  return data;

}

//check if this is the first page and hide the next button
const checkIfFirstPage = ()=>{
  if(pageNu == 0){
nextButton.setAttribute("style", "visibility: hidden")
  }
  else{
  nextButton.setAttribute("style", "visibility: visible")
}
}

//event handler for radio button
const handleChange = (event) => {
  pageNu = 0;
  let data = null;
  let checkedRadioValue = checkCheckedRadio().value;
  let formData = getFormData();
  //construct payload

   data = Object.assign({},formData,{modelName:checkedRadioValue},{pageNu:pageNu})

  //create request
  fetch('/api/exportData/', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',

    },
    mode: 'cors',

    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      //console.log('Success:', data);
      //graph data 
      d3.select("#svg-graph").remove()
      const dataSet = data.map(x => { return { value: x.value, date: new Date(Date.parse(x.date)) } })
      checkIfFirstPage()
      unhidePreviousButton()
      //redraw graph
      assignGraphData(dataSet)




    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

//event handler for page buttons
const handlePageButton = (event) => {

  let data = null;
  //construct payload
  data = constructPayload(event);

  //create request
  fetch('/api/exportData/', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',

    },
    mode: 'cors',

    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      //console.log('Success:', data);
      //graph data if there still any
      if (data.length != 0) {
        //check if first page and hide previous button accordingly
        checkIfFirstPage();
        unhidePreviousButton();
        d3.select("#svg-graph").remove()
        const dataSet = data.map(x => { return { value: x.value, date: new Date(Date.parse(x.date)) } })

        //redraw graph
        assignGraphData(dataSet)


      }
      else {
        //hide next button
        //subtract 1 to pageNu because no page was found
        pageNu -= 1;
        hidePreviousButton();
      }

    })
    .catch((error) => {
      console.error('Error:', error);
    });

}



//create event handler for page buttons
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
previousButton.addEventListener('click', handlePageButton);
nextButton.addEventListener('click', handlePageButton);

//create event handler for radio buttons
const temperatureRadio = document.getElementById("temperature-radio");
const phRadio = document.getElementById("ph-radio");
const electricRadio = document.getElementById("electric-radio");
temperatureRadio.addEventListener('change', handleChange);
phRadio.addEventListener('change', handleChange);
electricRadio.addEventListener('change', handleChange);

//main function of graphing
const graph = (dataSet, threshold, titles) => {


  //color array
  const colorArr = ["#EBDA58", "#2BED8A", "#F15F46"]

  //svg intiallization  
  const w = 1000;
  const h = 550;
  padding = 50;

  //get minimum/max values for x&y axes
  const maxX = d3.max(dataSet, (d) => d.date);
  const minX = d3.min(dataSet, (d) => d.date);
  const maxY = d3.max(dataSet, d => d.value);
  const minY = d3.min(dataSet, d => d.value);



  //console.log("Maximum x value " + maxX);
  //console.log("Minimum x value " + minX);
  //console.log("Maximum y value " + maxY);
  //console.log("Minimum y value " + minY);


  //x & y scales (scales are used to define each point location on the svg element by setting the domain of the points and mapping them to the range/length of the svg)
  const xScale = d3.scaleTime()
    .domain([minX, maxX])
    .range([2 * padding, w - 2 * padding])

  const yScale = d3.scaleLinear()
    .domain([minY, maxY])
    .range([h - 2 * padding, 2 * padding])

//svg element holds the graph
  const svg = d3.select("#svg")
    .append("svg")
    .attr("id", "svgElement")
    .attr("max-date", maxX)
    .attr("min-date", minX)
    .attr("id", "svg-graph")
    // .attr("width",w)
    // .attr("height",h)
    .attr("class", "svg")
    //two commands responsible of keeping the aspect ratio of the graph (for mobile users especially or the graph will be scrolled otherwise)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${w} ${h}`)


  const tooltip = d3.select("#svg")
    .append("div")
    .attr("id", "tooltip")
    .attr("class", "tooltip")

//event for displaying the tooltip
  const mouseover = () => {
    tooltip.style("opacity", 1)
    d3.select(event.target).style("fill", "#46413F");
  }
  //event for displaying the data, and position the tooltip
  const mousemove = () => {

    var date = new Date(d3.select(event.target).attr('data-date'))
    //structure and position of the tooltip
    tooltip
      .style("top", (event.pageY - 10) + "px")
      .style("left", (event.pageX + 10) + "px")
      .html(`${date.toLocaleDateString()} ${date.toLocaleTimeString()} <br/>
Value: ${d3.select(event.target).attr("data-value")} `)
      .attr("data-date", d3.select(event.target).attr('data-date'))

  }

  //event to hide the tooltip
  const mouseleave = () => {
    tooltip.style("opacity", 0)
    d3.select(event.target).style("fill", fillColor(d3.select(event.target).attr("data-value")));

  }
//color of each rect element based on its value and its corresponding threshold
  const fillColor = (d) => {
    if (d < threshold.min) {
      return colorArr[0]
    }
    else if (d >= threshold.min && d <= threshold.max) {
      return colorArr[1]
    }
    else {
      return colorArr[2]
    }
  }



//append the rects to the svg with their data and bind the tooltip's event to them
  svg.selectAll("rect.bar")
    .data(dataSet)
    .enter()
    .append("rect")
    .attr("width", (w - 2 * padding) / dataSet.length)
    .attr("height", d => h - yScale(d.value) - 2 * padding)
    .attr("x", (d) => xScale(d.date))
    .attr("y", d => yScale(d.value))
    .attr("class", "bar")
    .style("fill", d => fillColor(d.value))
    .style("stroke", "black")
    .attr("data-date", d => d.date)
    .attr("data-value", d => d.value)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)





//call xaxis and append it at the bottom of the svg
  const xAxis = d3.axisBottom(xScale)
  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (h - 2 * padding) + ")")
    .call(xAxis)
    .style("font-size", "18px")
    .style("font-weight", "bolder")


//call yaxis and apped it at the left of the svg
  const yAxis = d3.axisLeft(yScale);
  svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${2 * padding},0)`)
    .call(yAxis)
    .style("font-size", "18px")
    .style("font-weight", "bolder")


  //axes text
  //y-axis
  svg.append("text")
    .attr("transform", "translate(" + padding / 2 + "," + h / 2 + ") rotate(270)")
    .style("text-anchor", "middle")
    .style("font-size", "22px")
    .style("font-weight", "bolder")
    .text(titles.y)



  svg.append("text")
    .attr("transform", "translate(" + (w / 2) + ", " + (h - padding) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "22px")
    .style("font-weight", "bolder")
    .text(titles.x)


  //legend part
  //color scale  will map each color its position
  const colorScale = d3.scaleLinear()
    .domain([threshold.min, threshold.max])
    .range([2 * padding, 4 * padding])

//legend scale will map each threshold to its position
  const legendScale = d3.scaleOrdinal()
    .domain([0, threshold.min, threshold.max])
    .range([2 * padding, 3 * padding, 4 * padding])

  //legend axis will append the colors and its threshold using the scales
  const legendAxis = d3.axisBottom(legendScale)

  svg.append("g")
    .attr("transform", "translate(0, " + (h - padding / 2) + ")")
    .call(legendAxis)
    .style("font-size", "14px")
    .attr("text-anchor", "right")

  const legend = svg.append("g")
    .attr("id", "legend")
    .selectAll("rect.legend")
    .data(colorArr)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * padding + 2 * padding)
    .attr("y", h - padding)
    .style("fill", d => d)
    .attr("width", padding)
    .attr("height", padding / 2)


}

//call graph method
const req = new XMLHttpRequest();
req.open("GET", '/api/exportData/', true);
req.send();
req.onload = function() {
  const json = JSON.parse(req.responseText);
  const dataSet = json.map(x => { return { value: x.value, date: new Date(Date.parse(x.date)) } })
  //console.table(dataSet);
  assignGraphData(dataSet)
}
checkIfFirstPage();

//todo

const getFormData = ()=>{
const form = new FormData(document.getElementById('form'))
const  minValue = form.get('minValue');
const maxValue = form.get('maxValue');
const minDate = form.get('minDate');
const maxDate = form.get('maxDate');
const limit = form.get('limit')
const formData = {minValue : minValue , maxValue : maxValue , minDate : minDate , maxDate : maxDate , limit : limit}
//console.log(formData)
return formData;
}
getFormData()

const handleSubmit = (event)=>{
  //clear pages
  pageNu = 0;
  //stop form from submitting
    event.preventDefault();
    const formData = getFormData();
    const checkedRadioValue = checkCheckedRadio().value;
    //construct payload
    const data = Object.assign({},formData,{modelName:checkedRadioValue},{pageNu:pageNu})

//create request
  fetch('/api/exportData/', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',

    },
    mode: 'cors',

    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      //console.log('Success:', data);
      //graph data 
      d3.select("#svg-graph").remove()
      const dataSet = data.map(x => { return { value: x.value, date: new Date(Date.parse(x.date)) } })
      //hide the next buttons
     checkIfFirstPage()
     unhidePreviousButton()
      //redraw graph
      assignGraphData(dataSet)

    })
    .catch((error) => {
      console.error('Error:', error);
    });

}
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click',handleSubmit)

const hidePreviousButton = ()=>{
 previousButton.setAttribute("style", "visibility: hidden")
}
const unhidePreviousButton = ()=>{
previousButton.setAttribute("style", "visibility: visible")
}
