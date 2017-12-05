var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var bodyParser = require('body-parser'); // Charge le middleware permettant de parser les requêtes
var cookieSession = require('cookie-session') // Charge le middleware qui gère la session utilisateur dans un cookie

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

// Active le middleware de logging
app.use(morgan('combined'))

// Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
.use(express.static(__dirname + '/public'))

// Création du cookie qui contiendra les informations de session
.use(cookieSession({
        name: 'session',
        keys: ['key1', 'key2']
      }))

/* S'il n'y a pas de liste dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
        if (typeof(req.session.tasks) == 'undefined') {
                req.session.tasks = [];
        }
        next();
})

// Affichage de la liste et du formulaire
.get('/', function(req, res) {

        res.render('index.twig', {'titre': 'Ma todolist', 'tasks' : req.session.tasks});    

})

// Ajout d'une tâche à la liste des tâches
.post('/add/', urlencodedParser, function(req, res) {

        if (req.body.task) {
                req.session.tasks.push(req.body.task);
        }
        res.redirect('/');

})

// Suppression d'une tâche
.get('/delete/:id', function(req, res) {
        
        if (req.params.id) {                                
                req.session.tasks.splice(req.params.id, 1);
        }
        res.redirect('/');
        
})

// Gestion des erreurs
.use(function(req, res, next){
    
        res.status(404).render('404.twig');
    
});

app.listen(3000);
