const query = require("../conexion/newconnect")
const session = require("express-session")


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
        const traido = await query("SELECT * FROM calzadostabla WHERE marca=?",[parametro]);
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
        const traido = await query("SELECT * FROM calzadostabla WHERE id=?",[parametro]);
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
        console.log(req.session)
        let conteo = req.session.cuenta

        if (req.session.login == true) {
            enviaradministracion()
        } else{
            enviar()
        }
        async function enviar() {
        
            res.render('admin',{conteo})
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
            res.render('edit',{ calzado })
        }
        else{
             res.redirect('/login/admin');
        }
    }
    static async loginvalidar(req, res) {
        const traido = await query("SELECT * FROM administradores");
        const usuariodb = JSON.parse(JSON.stringify(traido).slice(1, -1))
        const usuariologin = JSON.parse(JSON.stringify(req.body))
        
        req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1
        
    
        if (usuariodb.contrasena == usuariologin.contrasena) {
            req.session.login = true
            
            enviaradministracion()

        } else{
            
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
    static async editarproducto(req,res){
        const id = req.params.id
        const traido = await query("SELECT * FROM calzadostabla WHERE id=?",[id])
        let calzado = JSON.parse(JSON.stringify(traido))
        console.log(id)
        console.log(calzado)
        res.render("editarproducto",{calzado})
    }
}



module.exports = AuthController