var express = require('express');
var app = express();

app.get('/', function(req, res) {

        res.render('index.twig', {'titre': 'Ma liste de tâches'});    

});

app.use(function(req, res, next){
    
        res.status(404).render('404.twig');
    
});

app.listen(3000);
