const faker = require('faker')
//generate dummy data for DB
const generateDummyData = (min, max)=>{
var dummyData = [];
for(let i = 0; i < 50; i++){
dummyData.push(
  {value : faker.random.number({
    'min': min,
    'max': max
}),
  date : faker.date.between('2021-1-15','2021-3-15')
})
}
return dummyData;
}

//generate dummy with constant time steps
let dummyDateAndValue = (baseDate,deltaDate,minValue,maxValue,size)=>{
let newDate =  baseDate;
let dummyData = [];
while(size > 0){

dummyData.push({value :( Math.floor(Math.random() * (maxValue - minValue) + minValue)),date : new Date(newDate.getTime() + deltaDate*60000) })
newDate = new Date(newDate.getTime() + deltaDate*60000)
size--;

}
return dummyData;
}


//save dummy data in db collection
const insertDummy = (dummyData,modelName)=>{
modelName.insertMany(dummyData, function (err, res) {
  if (err) {
    console.log(err);
  };
  console.log(res);
});
}

//delete all documents from a model
const purgeModel = (modelName)=>{
modelName.deleteMany({}, function(err) {
            if (err) {
                console.error(err)
            } else {
                console.log('data deleted successfuly from '+ modelName);
            }
        }
    )}

//create function to insert data in model
const  insertOne = async (modelName , dataObject)=>{
  await modelName.create(dataObject, function(err){
    if (err) {
                console.error(err)
            } else {
                console.log('data inserted successfuly in model ');
            }
  })
}
//function to create notificaiton object based on thresholds
const constructNotificaitonObject = (value, thresholdObj, modelName , date)=>{
  let dataObj = null;
  if (value < thresholdObj.min){
       dataObj = {model : modelName , value: value , date: new Date(date), condition: "below average", deviation: Math.abs(value - thresholdObj.min) , read: false }
   
  }
  else if (value > thresholdObj.max){
       dataObj = {model : modelName , value: value , date: new Date(date), condition: "above average", deviation: Math.abs(value - thresholdObj.max) , read: false }
  }
  return dataObj;
}

    //export function to be available to entire project
    exports.generateDummyData = generateDummyData;
    exports.dummyDateAndValue = dummyDateAndValue;
    exports.insertDummy = insertDummy;
    exports.purgeModel = purgeModel;
    exports.insertOne = insertOne;
    exports.constructNotificaitonObject = constructNotificaitonObject;