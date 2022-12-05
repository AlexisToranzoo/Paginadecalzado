var mysql= require("mysql")

var con=mysql.createConnection(
{
    host:'sql10.freesqldatabase.com',
    user:'sql10583013',
    password:'KRfwIUHFBT',
    port:'3306',
    database:'sql10583013'
}
)

con.connect(
    (err)=>{
        if(!err){
            console.log("conexion correcta");
        }
        else{
            console.log(err);
            console.log("ERROR DE CONEXIONN");
        }
    }
)

function query(sql,data){
    return new Promise(function (resolve,reject){
        con.query(sql,data,function(error,result,fields){
            if(error!=null){
                console.log(error)

                return reject({
                    error:true,
                    message:error.sqlMessage
                })

            }else{
                return resolve(result)
            }
        })
    })
}

module.exports = query;
