const express = require('express')
const app = express()
const Notification = require('../models/Notification')

app.get('/', (req, res) => {
res.render("notification",{title:"Notification Page"})})
//update the notification model when user reads it
app.patch('/',(req,res)=>{
  const {id , read} = req.body
  Notification.findByIdAndUpdate(id, {read: read})
  .then( data => res.json("Success in updating notificaiton"))
  .catch(err => res.status(400).json(err.message))
})

module.exports = app