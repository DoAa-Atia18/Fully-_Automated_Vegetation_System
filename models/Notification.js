//model to store the values that aren't within acceptable range to be fetched as a notifications for the user
//condition feild will contain a string either "below average/above average"
//read will be the status of the notfiicaiton the default being unread by the user 
const mongoose = require("mongoose")
const Schema = mongoose.Schema;


var NotificationSchema = new Schema({
 model: {type : String, required: true},
 value : {type :Number, required : true,trim: true,},
 date : {type : Date , required : true},
 condition: {type: String, required: true},
 deviation: {type: Number, required: true},
 read: {type: Boolean, required: true, default: false}
})
  
 
  module.exports = mongoose.model('Notification', NotificationSchema);