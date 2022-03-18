const express = require('express')
const app = express()
const moment = require("moment")
//import models 
const { Temperature } = require('../models/Base')
//return page and set title & minimum date of the form to the oldest record in the database and the maximum date to the current date
app.get('/', (req, res) => {
  Temperature.find({})
   .sort({ "date": +1 })
    .select("date -_id")
    .limit(1)
    .then(data => {
      
      const currentDate = new Date();
      var tommorow = moment(currentDate, "MM-DD-YYYY").add(1, 'days'); //add a day to make sure the default fetch (with no date change) gets all data containig today's readings
      res.render("statistics",{title:"Statistics Page", minDate : `${data[0].date.toISOString().split('T')[0]}`, maxDate : tommorow.toISOString().split("T")[0] })
    })
    .catch(err => res.status(400).send(err.message))
  
});

module.exports = app

// db.collection.find().sort({age:-1}).limit(1) // for MAX
// db.collection.find().sort({age:+1}).limit(1) // for MIN