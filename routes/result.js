const express = require('express')
const app = express()

app.get('/', (req, res) => {
 res.redirect("http://yousseffekry.pythonanywhere.com/state")
});

module.exports = app

