const express = require('express');
var cors = require('cors')
const app = express();

app.use(cors())

const fs = require('fs');
var path = require('path');




app.use(express.static('public'))
// Set 'views' directory for any views  
// being rendered res.render() 
app.set('views', (__dirname, 'views'));
// Set view engine as EJS 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(clientErrorHandler);


app.listen(process.env.PORT || 5000)

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}

app.get('/', (req, res) => {

    enviar()
    async function enviar() {
        let calzado =
        {
        nombre: ["converse panchas", "converse panchas", "converse panchas", "converse panchas","vans"],
        imagen: ["harenna.jpg", "harenna.jpg", "harenna.jpg", "harenna.jpg", "harenna.jpg"],
        talles: ["12,133,123,4", "12,133,123,4", "12,133,1223,4", "12,133,123,4","2,3,1"],
        colores: ["rojo verde", "rojo verde", "rojo verde", "rojo verde","negro"],
        marca:["converse","converse","converse","converse","vans"]
        }
        res.render('index', { calzado })
    }
})
app.get('/calzado/:marca', express.json(), (req, res) => {
    let marcaa = req.params
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    let input = req.body.input
    let calzadofiltro={
        nombre:[],
        imagen:[],
        talles:[],
        colores:[],
        marca:[],
    }
    let calzado =
    {
        nombre: ["converse panchas", "converse panchas", "converse panchas", "converse panchas","vans"],
        imagen: ["harenna.jpg", "harenna.jpg", "harenna.jpg", "harenna.jpg", "harenna.jpg"],
        talles: ["12,133,123,4", "12,133,123,4", "12,133,1223,4", "12,133,123,4","2,3,1"],
        colores: ["rojo verde", "rojo verde", "rojo verde", "rojo verde","negro"],
        marca:["converse","converse","converse","converse","vans"]
    }
    async function filtrador (marcaelegida){
        for (let i = 0; i < calzado.marca.length; i++) {
            if (calzado.marca[i] === `${marcaelegida}`) {
                calzadofiltro.nombre.push(calzado.nombre[i])
                calzadofiltro.imagen.push(calzado.imagen[i])
                calzadofiltro.talles.push(calzado.talles[i])
                calzadofiltro.colores.push(calzado.colores[i])
                calzadofiltro.marca.push(calzado.marca[i])
                
            }
            else{
             
            }
           
           }
    }
    console.log(marcaa)
    console.log(marcaa.marca)
    filtrador(marcaa.marca)
   calzado = calzadofiltro
    res.render('calzadofiltrado', { calzado })

  

});

app.get('/ver/:marca/:nombre',express.json(), (req, res) => {
    console.log(req.params)
    let info = req.params
    res.render('ver', { info })
});
app.post('/', express.json(), (req, res) => {

    let input = req.body.input

    let calzado =
    {
        nombre: "",
        imagen: "",
        talles: "",
        colores: "",
    }
    res.send({ input })







});
