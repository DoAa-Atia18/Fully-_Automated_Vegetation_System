// server.js
// where your node app starts

// init project
require('dotenv').config();// for accessing .env variables

const express = require('express');//for backend api development
const app = express();

//import ejs to reuse code

const expressLayouts = require('express-ejs-layouts')

// Set Templating Engine
app.use(expressLayouts)
//app.set('layout', './layouts/full-width')
app.set('view engine', 'ejs')


const path = require('path');//used to concate directories
const faker = require('faker');//for dummy generation
const bodyParser = require("body-parser")//used to parse form responses
const mongoose 
= require("mongoose")//for database schema building
//to allow external sites to get json data
const cors = require('cors');
//mount body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false})); // for form request to work
app.use(bodyParser.json()); // for fetch request to work
require('dotenv').config();// for accessing .env variables


//connect to database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("Connected to DB")
});


// http://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bin')));
app.use(cors());


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.status(200).json({greeting: 'hello API'});
});

// Send current stage to MCU (set to 2 for testing)
app.get("/api/stage", function (req, res) {
  res.status(200).json(2);
});



//import routes
const index = require('./routes/index')
const api = require('./routes/api')
const exportData = require('./routes/exportData')
const statistics = require('./routes/statistics')
const notification = require('./routes/notification')
const importData = require('./routes/importData')
const exportNotification = require('./routes/exportNotification')
const upload = require('./routes/upload')
const exportImg = require('./routes/exportImg')
const result = require("./routes/result")




//set routes
app.use('/',index)
app.use('/statistics',statistics)
app.use('/api',api)
app.use('/api/exportData',exportData)
app.use('/notification',notification)
app.use('/api/importData',importData)
app.use('/api/exportNotification',exportNotification)
app.use('/upload',upload)
app.use('/exportImg',exportImg)
app.use('/result',result)




// // Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

// listen for requests 
var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

