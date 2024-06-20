var express = require('express');
var {engine} = require('express-handlebars');
var bp = require('body-parser');

var app = express();

// configurações para o express entender como vamos 
// responder a requests e onde encontrar as views
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// configurações para o body-parser conseguir trazer os dados 
// do front para o back-end
app.use(bp.urlencoded({extended:false}))
app.use(bp.json());

// criação da lista global
var listaDeCafes = [];

app.get('/', function (req, resp){
    resp.render('index');
});


app.get('/contatos', function(req, resp){
    resp.render('contato');
})

app.get('/cafes', function(req, resp){
    resp.render('cafes');
})

app.post('/cafes', function(req, resp){
    marca = req.body.marca;
    peso = req.body.peso;
    preco = req.body.preco;
    preco = parseFloat(preco);
    valorPraAbater = preco * 0.02;
    preco = preco - valorPraAbater;
    exibeCafe = false;
    if(peso > 100){
        exibeCafe = true;
    }
    cafe = {
            "peso":peso,
            "marca": marca,
            "preco":preco,
            "exibe_cafe":exibeCafe
            }
    listaDeCafes.push(cafe);
    resp.render('cafecomdesconto',{listaDeCafes});

})

app.listen(3000);

