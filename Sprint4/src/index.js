const express = require('express')
const app = express()
const morgan = require('morgan')

//Configuración
app.set('port', process.env.PORT || 8081)
app.set('json spaces', 2)

//middleware: funcion que procesan datos, antes de ir al servidor
app.use(morgan('dev'))
app.use(express.json()) //Habilita el serv para recibir y procesar json
app.use(express.urlencoded({extended: false})) //datos de un input en un form

const usuarios = require('./usuarios_data.json')
console.log(usuarios)

//rutas
//app.use(require('./rutas/usuarios')) // << linea comentada

app.get('/', (req, res) => {   // << Codigo Traido de usuarios se cambio const router por app 
    res.send("Pagina de inicio  .")  //el servidor envia un obj json
})

app.get('/usuarios', (req, res) => {   // << Codigo Traido de usuarios se cambio const router por app 
    // res.send("Listado de usuarios.")  //el servidor envia un obj json
    res.json(usuarios)  // << respuesta json
})

app.post('/usuarios/post', (req, res) => {  // Agregado de producto en postman
    // console.log(req.body)
    // Reconstruir un objeto
    const {Tipo_Documento, Documento, Nombre, Telefono, Email, Genero, Nacionalidad, EPS, IPS, Tipo_Solicitud, Direccion, Tipo_Plan} = req.body
    if(Tipo_Documento && Documento && Nombre && Telefono && Email && Genero && Nacionalidad && EPS && IPS && Tipo_Solicitud && Direccion && Tipo_Plan){
        // res.json('Producto guardado.')
        const numero_solicitud = usuarios.length + 1
        const newUser = {...req.body, numero_solicitud}
        console.log(newUser)
        usuarios.push(newUser)
        res.json(usuarios)
    } else {
        res.json('Petición errónea.')  
    }
    // res.send('Producto agregado.')
})

app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en el puerto ${app.get('port')}`)
})

/* Pasos: 
    1. npm i nodemon -D
    2. npm run dev
*/
