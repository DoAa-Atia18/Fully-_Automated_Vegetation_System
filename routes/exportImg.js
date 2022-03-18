const express = require('express')
const app = express()
const Image = require("../models/Image")
app.get('/', (req, res) => {
    console.log("Inside export image get handler: ")
    Temperature.find({})
    .sort({ "date": +1 })
     .select("date -_id")
     .limit(1)
     .then(data => {
    

     })
   
});


module.exports = app