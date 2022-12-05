const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())
const productoscontroller= require("./controllers/productoscontroller")
const fs = require('fs');
const jwt = require("jsonwebtoken");
var path = require('path');
const session = require("express-session")
var multer = require('multer')
var fecha = Date.now();
var rutaAlmacen = multer.diskStorage({
    destination:function(request,file, callback){
        callback(null,'./public/images/')
    },
    filename:function (request,file,callback) {
        console.log(file);
        callback(null,fecha+"_"+file.originalname.replace(/\s/g, ''))
    }
});
var cargar = multer({storage:rutaAlmacen});
const multipleUpload = cargar.fields([{ name: 'imagen'}, { name: 'imagenes', maxCount: 3 }])


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
app.use(session({
    secret:'testing',
    resave:true,
    saveUninitialized:true
}))

app.get('/', productoscontroller.obtener)

app.get('/calzado/:marca',productoscontroller.filtrar);
app.get('/login/admin',productoscontroller.logincargar)
app.post('/login/admin',productoscontroller.loginvalidar)
app.get('/ver/:id',productoscontroller.ver);
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

app.post('/eliminar/:id',productoscontroller.borrar);
app.get('/editar',productoscontroller.editar,verifyToken,);
app.post('/actualizar/:id',multipleUpload,productoscontroller.actualizar);
app.post('/agregarnuevo',multipleUpload,productoscontroller.agregar);
app.get('/agregarnuevo0',express.json(), (req, res) => {
    res.render("agregarproducto")
});



app.get('/editar/:id',productoscontroller.editarproducto);
app.post('/login/logout',productoscontroller.cerrarsesion);

function verifyToken(req, res, next){
    const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
         const bearerToken = bearerHeader.split(" ")[1];
         req.token  = bearerToken;
         next();
    }else{
        res.sendStatus(403);
    }
}
