const express = require('express');
const path = require('path');
var cors = require('cors')

const app = express();
const port = 6660;

// sendFile will go here
app.get('/google-button',  (req, res)=> {
    res.sendFile(path.join(__dirname, 'googleButton/index.html'));
});

app.get('/s3-send-image' ,(req, res)=>{
    res.sendFile(path.join(__dirname, 's3SendImage/index.html'));
})
app.use(cors())
app.listen(port);
console.log('Server started at http://192.168.10.23:' + port);