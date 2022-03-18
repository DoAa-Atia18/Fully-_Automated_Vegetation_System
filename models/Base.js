const mongoose = require("mongoose")
const Schema = mongoose.Schema;


var BaseSchema = new Schema({
  value : {type :Number, required : true,trim: true,},
  date : {type : Date , required : true}
})

  
 
module.exports = {
  Temperature: mongoose.model('Temperature',BaseSchema),
  PH: mongoose.model('PH',BaseSchema),
  ElectricConductivity : mongoose.model('ElectricConductivity',BaseSchema),
  OuterTemp : mongoose.model("OuterTemp",BaseSchema),
  Humidity : mongoose.model("Humidity",BaseSchema)
}