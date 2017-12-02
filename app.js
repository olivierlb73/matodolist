var express = require('express');
var app = express();

app.get('/', function(req, res) {
    
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    
        res.end('Vous êtes à l\'accueil');
    
    });
app.listen(3000);
