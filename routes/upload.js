const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path'); //used to concate directories
const sharp = require("sharp"); //for image compression
const Image = require("../models/Image")
const helpers = require('../bin/helpers')
//setup for uploading image using multer

const multer = require('multer');
const MAX_FILE_SIZE = 1024 * 1024 * 5
//save image in uploads destination 
function fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {

        cb(null, true)
    } else {
        console.log("File type: ", file.mimetype)
        cb(null, false, new Error('File type not supported or file size is larger than 5 MB '))
    }

}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + new Date().toDateString() + '-' + file.fieldname + ".jpg")
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: MAX_FILE_SIZE
    },
    fileFilter: fileFilter
})


app.get('/', (req, res) => {
    res.render("upload", {
        title: "Upload Page",
        message: "Please upload an image supported formats are PNG/JPEG up to 5MB."
    })
});

app.post("/", upload.single("imagefile"), async (req, res, next) => {
    try {
        await sharp(req.file.path)
            .resize({
                width: 224,
                height: 224,
                fit: sharp.fit.fill
            })
            .toFormat('jpeg')
            .jpeg({
                quality: 100,
                chromaSubsampling: '4:4:4',
                force: true
            })
            .toFile(
                path.resolve(req.file.destination, 'resized', req.file.filename)
            )
        fs.unlinkSync(req.file.path)
      
        //console.log(path.join(process.cwd() + req.file.destination + "resized" + req.file.filename))
        // const request = require ("request")
        // fs.createReadStream(req.file.path).pipe( request.post("yousseffekry.pythonanywhere.com"))

        //Prepare image object
        // const imageObj = {
        //     name: req.body.name,
        //     img: {
        //         data: fs.readFileSync(path.resolve(process.cwd(), req.file.destination, "resized", req.file.filename)),
        //         contentType: 'image/jpeg'
        //     },
        //     date: new Date()
        // }
        // const request = require("request")
        // const formData = {
        //     imagefile: fs.createReadStream(path.resolve(process.cwd(), req.file.destination, "resized", req.file.filename))
        //     }

        // request.post({
        //     url: 'http://127.0.0.1:3000/api',
        //     formData: formData
        // }, function optionalCallback(err, httpResponse, body) {
        //     if (err) {
        //         return console.error('upload failed:', err);
        //     }
        //     console.log('Upload successful!  Server responded with:', body);
        // });

        // Python request part
        var FormData = require('form-data');
        let formData = new FormData();
        const axios = require('axios').default;//used to send image in form
        // let buffer = fs.readFileSync(path.resolve(process.cwd(), req.file.destination, "resized", req.file.filename));//Buffer isn't accepted by the route handle so stream is used instead
        let stream = fs.createReadStream(path.resolve(process.cwd(), req.file.destination, "resized", req.file.filename));
        // const imgBlob = new Blob(buffer, {type: 'image/jpeg'});
        formData.append("imagefile", stream);
        axios.post('http://yousseffekry.pythonanywhere.com', formData, {
                headers: formData.getHeaders()
            })
            .then(function (response) {
                console.log("In the response section: ", response);
            })
            .catch(function (error) {
                console.log("Inside error: ", error);
            });

        // const https = require('https');

        // const postData = JSON.stringify({
        //     imagefile: imageObj.img.data

        // });

        // const options = {
        //     hostname: 'yousseffekry.pythonanywhere.com',
        //     path: '/',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Content-Length': Buffer.byteLength(postData)
        //     }
        // };

        // const requset = https.request(options, (res) => {
        //     //console.log(`STATUS: ${res.statusCode}`);
        //     //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        //     res.setEncoding('utf8');
        //     res.on('data', (chunk) => {
        //         console.log(`BODY: ${chunk}`);
        //     });
        //     res.on('end', () => {
        //         console.log('No more data in response.');
        //     });
        // });

        // requset.on('error', (e) => {
        //     console.error(`problem with request: ${e.message}`);
        // });

        // // Write data to request body
        // requset.write(imageObj);
        // requset.end();

        //Upload "processed" image to model



        //Insert object into model
        //helpers.insertOne(Image, imageObj)

        res.status(200).render("upload", {
            title: "Upload Page",
            message: "Success! upload another..."
        });

    } catch (err) {
        console.log("Inside upload handler ", err.message)
        res.status(415).send({
            "Error": err.message
        })

    }
})



module.exports = app