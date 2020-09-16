// installation de tous les modules
//framework express qui nous aide à créer le router
const express = require('express');
const app = express();
const mongoose=require("mongoose");
const fs = require('fs');


//pour pouvoir utiliser les formulaires
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// utilisation des template EJS grâce au modules npm "ejs"
app.set('views', './views');
app.set('view engine', 'ejs');

// on indique à express où sont les fichiers statiques js, image et css
app.use(express.static(__dirname + '/public'));


// connexion à notre base de donnée grâce au module mongoose
let db=mongoose.connect("mongodb://localhost/bodega",{useNewUrlParser: true, useUnifiedTopology: true });

//gestion des messages 
mongoose.connection.on("error",function(){
    console.log("Erreur de connexion à la base de données");
})
mongoose.connection.on("open",function(){
    console.log("Connexion réussie");
})

//création des schémas
let platSchema = mongoose.Schema({
	nom:String,
	description:String,
	categorie:String,
    disponibilite:Boolean,
    image:String,
    prix:Number,
	miseEnAvant:Number
});

//création des models
let Plat = mongoose.model("Plat",platSchema);


//HOME PAGE
app.get('/', (req, res)=>{
	res.render('index');
});

//LOGIN PAGE
app.get('/login', (req, res)=>{
	res.render('login');
});


//PAGE ADMIN
app.get('/admin', (req, res)=>{
	res.render('admin');
});

//soumission du formulaire
app.post('/admin',function(req,res){
    //récupérer les données issues du formulaire
       let nom = req.body.nom;
       let description = req.body.description;
       let prix = req.body.prix;
       let categorie = req.body.categorie;
       let disponibilite;
        if(req.body.disponibilite){disponibilite=true} 
       else {disponibilite=false};
       let miseEnAvant;
       if(req.body.miseEnAvant){miseEnAvant=true} 
       else {miseEnAvant=false};

    
       let data = { 
        "nom": nom, 
        "prix":prix,
        "description":description, 
        "disponibilite": disponibilite,
        "miseEnAvant":miseEnAvant,
        "categorie":categorie,
        
    } 

    let myData = new Plat(data);
    myData.save();
    console.log(data);
    res.redirect("/carte/"+categorie);
})


//Liste
app.get('/liste', (req, res)=>{
    Plat.find({disponibilite:true}).sort('miseEnAvant').exec(function(err,plats){
        if(err)throw err;
        console.log(plats);
        res.render('liste',{plats:plats});
    })
})

//TOUTE LA CARTE
app.get('/carte', (req, res)=>{
    Plat.find({disponibilite:true}).sort('miseEnAvant').exec(function(err,plats){
        if(err)throw err;
        console.log(plats);
        res.render('carte',{plats:plats});
    })
})

//CARTE PAR CATEGORIE
app.get('/carte/:cat', (req, res)=>{
    let cat = req.params.cat;
    Plat.find({disponibilite:true,categorie:cat}).sort('miseEnAvant').exec(function(err,plats){
        if(err)throw err;
        console.log(plats);
        res.render('carte',{plats:plats});
    })
})



app.use(function(req,res){
    res.setHeader('Content-Type','text/plain');
    res.status(404).send('Page introuvable');
})


app.listen(3000);
