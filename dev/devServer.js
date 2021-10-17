const express = require('express');
const path = require('path');
var cors = require('cors')

const app = express();
const port = 6660;


app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
  });


app.get('/',  (req, res)=> {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/google-button',  (req, res)=> {
    res.sendFile(path.join(__dirname, 'googleButton/index.html'));
});

app.get('/s3-send-image' ,(req, res)=>{
    res.sendFile(path.join(__dirname, 's3SendImage/index.html'));
})

app.listen(port);
console.log('Server started at http://localhost:' + port);