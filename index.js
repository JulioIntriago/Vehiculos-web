const express = require('express')
const cors = require('cors')
const product = require('./rutas/js.js')


// vamos a definir una variable de tipo express
//que pueda utilizar las funciones del framework
let app = express()
    // que use cors para poder ser accedido desde
    //otros servidores
    .use(cors())
    // que publique o exponga una carpeta en la web
    .use(express.static(__dirname + '/public'))
    .use('/publications', product.ruta)
    .listen(process.env.PORT || 4000)