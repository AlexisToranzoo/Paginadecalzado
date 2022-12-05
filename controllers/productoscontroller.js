const query = require("../conexion/newconnect")
const session = require("express-session")
var borrar = require("fs");
const { Console } = require("console");
const jwt = require("jsonwebtoken");

class AuthController {
    
    static async obtener(req, res) {
        const traido = await query("SELECT * FROM calzadostabla");
        console.log(traido)


        async function enviar() {
            let calzado = JSON.parse(JSON.stringify(traido))

            res.render('index', { calzado })
        }

        enviar()
    }
    static async filtrar(req, res) {
        const parametro = req.params.marca
        console.log("AASDASADSA" + parametro)
        const traido = await query("SELECT * FROM calzadostabla WHERE marca=?", [parametro]);
        console.log(traido)


        async function enviar() {
            let calzado = JSON.parse(JSON.stringify(traido))

            res.render('index', { calzado })
        }

        enviar()
    }
    static async ver(req, res) {
        const parametro = req.params.id
        console.log("AASDASADSA" + parametro)
        const traido = await query("SELECT * FROM calzadostabla WHERE id=?", [parametro]);
        console.log(traido)


        async function enviar() {
            let calzado = JSON.parse(JSON.stringify(traido))
            console.log(calzado)
            res.render('ver', { calzado })
        }

        enviar()
    }
    static async logincargar(req, res) {
       
        req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1

        let conteo = req.session.cuenta

        if (req.session.login == true) {
            jwt.verify(req.token, 'secretkey', (error, authData) => {
                if(error){
                    res.sendStatus(403);
                }else{
                    enviaradministracion()
                }
            });
           
        } else {
            enviar()
        }

        async function enviar() {

            res.render('admin', { conteo })
        }
        async function enviaradministracion() {


            res.redirect('/editar');
        }

    }
    static async editar(req, res) {
        if (req.session.login == true) {
            const traido = await query("SELECT * FROM calzadostabla");
            let calzado = JSON.parse(JSON.stringify(traido))
            console.log(calzado)
            res.render('edit', { calzado })
        }
        else {
            res.redirect('/login/admin');
        }
    }
    static async loginvalidar(req, res) {
        const traido = await query("SELECT * FROM administradores");
        const usuariodb = JSON.parse(JSON.stringify(traido).slice(1, -1))
        const usuariologin = JSON.parse(JSON.stringify(req.body))

        req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1


        if (usuariodb.contrasena == usuariologin.contrasena) {
            let conus = usuariologin.contrasena+usuariologin.nombre
            req.session.login = true

            jwt.sign({conus}, 'secretkey', {expiresIn: '32122s'}, (err, token) => {
                res.json({
                    token
                })});
            enviaradministracion()

        } else {

            console.log("no coinciden")
            enviar()
        }


        let conteo = req.session.cuenta
        console.log(req.session)


        async function enviar() {

            res.render('admin')
        }
        async function enviaradministracion() {

            res.redirect('/editar');
        }


    }
    static async editarproducto(req, res) {
        const id = req.params.id
        const traido = await query("SELECT * FROM calzadostabla WHERE id=?", [id])
        let calzado = JSON.parse(JSON.stringify(traido))
        console.log(id)
        console.log(calzado)
        res.render("editarproducto", { calzado })
    }
    static async actualizar(req, res) {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        console.log(req.files['imagen'][0])
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        console.log(req.files['imagenes'][0])
        const id = req.params.id
        let calzado = req.body
        console.log(id)
        console.log(calzado)
        var nombreImagen = "public/images/" + calzado.imagen;
        var nombreImagenes = "public/images/" + calzado.imagenes;
        console.log(nombreImagen)

        if (req.files['imagen'][0]) {
            
            

            if (req.files['imagen'][0].filename) {
                if (borrar.existsSync(nombreImagen)) {
                    borrar.unlinkSync(nombreImagen)
                    console.log(nombreImagen)
                    console.log("EXISTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
                }
                let archivo = req.files['imagen'][0]
                await query("UPDATE calzadostabla SET imagen=? WHERE id=?", [archivo.filename, id])
            }
        }
        if (req.files['imagenes'][0]) {
            
            

            if (req.files['imagenes'][0].filename) {
                if (borrar.existsSync(nombreImagenes)) {
                    borrar.unlinkSync(nombreImagenes)
                    console.log(nombreImagen)
                    console.log("EXISTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
                }
                let archivo = req.files['imagenes'][0]
                await query("UPDATE calzadostabla SET imagenes=? WHERE id=?", [archivo.filename, id])
            }
        }

        await query("UPDATE calzadostabla SET nombre=?,talles=?,colores=?,marca=?,categoria=? WHERE id=?", [calzado.nombre,calzado.talles,calzado.colores,calzado.marca,calzado.categoria, id])
        res.redirect("/editar")
    }
    static async agregar(req, res) {
        let archivo = req.files['imagen'][0]
        let archivo2 = req.files['imagenes'][0]
        let calzado = req.body
        await query("INSERT INTO calzadostabla (nombre,talles,colores,marca,categoria,imagen,imagenes) VALUES (?,?,?,?,?,?,?)", [calzado.nombre,calzado.talles,calzado.colores,calzado.marca,calzado.categoria, archivo.filename,archivo2.filename])
        res.redirect("/editar")
    }
    static async borrar(req, res) {
        let id = req.params.id
        await query("DELETE FROM calzadostabla WHERE id=?",id)
        res.redirect("/editar")
    }
    static async cerrarsesion(req, res) {

        req.session.login = req.session.login ? false : false
        res.redirect("/editar")
    }
    

}



module.exports = AuthController