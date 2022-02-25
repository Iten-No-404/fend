const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')

const app = express()
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))
// app.use(express.json());

console.log(__dirname)
const meaningCloudURL = "https://api.meaningcloud.com/sentiment-2.1";
console.log(`Your API key is ${process.env.API_KEY}`);

let inputURL = ''
let textapi = {
    // application_id: process.env.API_ID,
    key: process.env.API_KEY
 };

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/analyze', async function (req, res) {
    inputURL = req.body.url;
    console.log('Req.body=')
    console.log(req.body.url)
    const response = await fetch(meaningCloudURL+'?key='+process.env.API_KEY+'&url='+req.body.url+'&lang=en')
    const data = await response.json()
    console.log(data)
    res.send(data)
})
