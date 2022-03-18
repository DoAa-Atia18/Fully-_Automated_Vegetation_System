const express = require('express')
const app = express()

const Notification = require('../models/Notification')

app.get('/', (req, res) => {
  Notification.find({read: false})
    .sort({ "date": -1 })
    .select("-__v")
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).send(err.message))
});

module.exports = app