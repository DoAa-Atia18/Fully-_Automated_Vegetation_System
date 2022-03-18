const express = require('express')
const app = express()
//import models 
const { Temperature } = require('../models/Base')
const { PH } = require('../models/Base')
const { ElectricConductivity } = require('../models/Base')
const { OuterTemp } = require('../models/Base')
const { Humidity } = require('../models/Base')


//Default response get first 100 point from Temperature model
app.get('/', (req, res) => {
  Temperature.find({})
    .select("-_id value date")
    .sort({ "date": -1 })
    .limit(100)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).send(err.message))
});

app.post('/', (req, res) => {
try{
  //res.header("Access-Control-Allow-Origin:*")
  const { modelName, minDate, maxDate , pageNu ,limit , minValue , maxValue } = req.body;
  let model;
  console.log(req.body)
  if (modelName == "Temperature") {
    model = Temperature;
  }
  else if (modelName == "PH") {
    model = PH;
  }
  else if (modelName == "ElectricConductivity") {
    model = ElectricConductivity;
  }
  else if (modelName  == "OuterTemp"){
    model = OuterTemp;
  }
  else if (modelName  == "Humidity"){
    model = Humidity;
  }

model.find({ value:{ $gte: parseInt(minValue) ,$lte: parseInt(maxValue) } , date: { $gte: new Date(minDate) ,$lte: new Date(maxDate) }})
.select("-_id value date")
.sort({"date":-1})
.skip(pageNu* parseInt(limit))
.limit(parseInt(limit))
.then(data => {
  res.json(data)
})}
catch(err){
  console.log("Inside export data post handler ",err.message)
  res.status(400).send({"Error": err.message})
}

})

module.exports = app