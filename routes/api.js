const express = require('express')
const app = express()
const helpers = require('../bin/helpers')
const {
    Temperature
} = require('../models/Base')
const {
    PH
} = require('../models/Base')
const {
    ElectricConductivity
} = require(('../models/Base'))
const {
    OuterTemp
} = require(('../models/Base'))
const {
    Humidity
} = require(('../models/Base'))
const Notification = require(('../models/Notification'))



// PH.deleteOne({ value: 50 }, function (err) {
//   if(err) console.log(err);
//   console.log("Successful deletion");
// });
//const dummyData = helpers.generateDummyData(0,100)
//console.table(dummyData)
// helpers.purgeModel(PH)
// helpers.purgeModel(ElectricConductivity)
// helpers.purgeModel(Temperature)
// helpers.purgeModel(Notification)
//helpers.purgeModel(OuterTemp)
//helpers.purgeModel(Humidity)






//  const dummyData1 = helpers.dummyDateAndValue(new Date(2021,5,25),30,1,14,250)
// const dummyData2 = helpers.dummyDateAndValue(new Date(2021,5,25),30,0,100,250)
// const dummyData3 = helpers.dummyDateAndValue(new Date(2021,5,25),30,1,80,250)
//  const dummyData4 = helpers.dummyDateAndValue(new Date(2021,5,25),30,0,50,250)
//  const dummyData5 = helpers.dummyDateAndValue(new Date(2021,5,25),30,0,100,250)



//  helpers.insertDummy(dummyData1,PH)
// helpers.insertDummy(dummyData2,Temperature)
// helpers.insertDummy(dummyData3,ElectricConductivity)
// helpers.insertDummy(dummyData4,OuterTemp)
// helpers.insertDummy(dummyData5,Humidity)







module.exports = app