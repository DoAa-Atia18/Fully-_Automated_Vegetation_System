//This route is for importing data from the MC and saving it in its corresponding model as well as checking if the imported values are in acceptable range, otherwise, that value will be saved in the notificaiton model as well as to be displayed for the user
const express = require('express')
const app = express()
//import models 
const {
  Temperature
} = require('../models/Base')
const {
  PH
} = require('../models/Base')
const {
  ElectricConductivity
} = require('../models/Base')
const {
  OuterTemp
} = require('../models/Base')
const {
  Humidity
} = require('../models/Base')


const Notification = require('../models/Notification')
//import helper functions
const helpers = require('../bin/helpers')
const moment = require("moment")
//graph values
const TemperatureThreshold = {
  min: 20,
  max: 50
}
const PHThreshold = {
  min: 6,
  max: 8
}
const ElectricThreshold = {
  min: 10,
  max: 30
}
const OuterTempThreshold = {
  min: 15,
  max: 35
}
const HumidityThreshold = {
  min : 30,
  max : 100
}
//thresholds are used to evaluate the data value to see if it should be saved as a notificaiton

app.post('/', (req, res) => {
    try {
  
    let {
      modelName,
      value,
      date
    } = req.body;
    //check if date is in "1995-12-17T03:24:00" format
    if (date.includes("T")) {

    } else {
      //use moment to consturct a date object
      date = moment(date)
    }
    let model;
    console.log(req.body)
    //check model type 
    if (modelName == "Temperature") {
      model = Temperature;
      //check value if it should be saved as a notificaiton
      let notificaitonObj = helpers.constructNotificaitonObject(value, TemperatureThreshold, modelName, date)
      //constructNotificaitonObject() returns null if the value is within acceptable thresholds
      if (notificaitonObj != null) {
        helpers.insertOne(Notification, notificaitonObj)
      }
    } else if (modelName == "PH") {
      model = PH;
      let notificaitonObj = helpers.constructNotificaitonObject(value, PHThreshold, modelName, date)
      if (notificaitonObj != null) {
        helpers.insertOne(Notification, notificaitonObj)
      }

    } else if (modelName == "ElectricConductivity") {
      model = ElectricConductivity;
      let notificaitonObj = helpers.constructNotificaitonObject(value, ElectricThreshold, modelName, date)
      if (notificaitonObj != null) {
        helpers.insertOne(Notification, notificaitonObj)
      }

    } else if (modelName == "OuterTemp") {
      model = OuterTemp;
      let notificaitonObj = helpers.constructNotificaitonObject(value, OuterTempThreshold, modelName, date)
      if (notificaitonObj != null) {
        helpers.insertOne(Notification, notificaitonObj)
      }
    }
    else if (modelName == "Humidity") {
      model = Humidity;
      let notificaitonObj = helpers.constructNotificaitonObject(value, HumidityThreshold, modelName, date)
      if (notificaitonObj != null) {
        helpers.insertOne(Notification, notificaitonObj)
      }
    }
    //insert imported data from MC in to corresponding model
    console.log("model value is : ", model)
    let dataObj = {
      value: value,
      date: new Date(date)
    }
    helpers.insertOne(model, dataObj)
    res.status(200).send({
      success: "Success in inserting data!"
    });
  } catch (err) {
    console.log("Inside import data handler ", err.message)
    res.status(415).send({
      "Error": err.message
    })
  }
})



module.exports = app