//definición de constantes
const express = require('express')
var firebase = require('firebase');
const bodyParser = require('body-parser')
let router = express.Router()
router.use(bodyParser())

var config = {
    apiKey: "AIzaSyAkQIk3mtbxnijLcS7P0AQnjf1KRWa8MIw",
    authDomain: "services-e2042.firebaseapp.com",
    databaseURL: "https://services-e2042.firebaseio.com",
    projectId: "services-e2042",
    storageBucket: "services-e2042.appspot.com",
    messagingSenderId: "737765084297",
    appId: "1:737765084297:web:0a4d0f3e107816e2654a58",
    measurementId: "G-83G5X2QDL6"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
let basededatos = firebase.database();

router.route('/')
    .get(function(req, res) {
        //arreglo donde vamos a almacenar los clientes 
        let arreglo = [];
        basededatos.ref('vehiculos').once('value').then(datos => {
            // es necesario convertir los nodos de firebase e incluirlos en el arreglo  
            datos.forEach(nodo => {
                arreglo.push(nodo.val());
            })
            res.send({ publications: arreglo });
        }).catch(err => {
            console.log(err)
            res.send('Los datos no se pudieron consultar');
        })
    })

//define método POST utilizando el cuerpo del mensaje
.post(function(req, res) {
    console.log(req.body);
    basededatos.ref("vehiculos/" + req.body.model).set(req.body).then(p => {
        res.send({ message: 'vehiculo creado' });
    }).catch(err => {
        console.log(err);
    });
});


//método GET individual para acceder a un solo cliente
router.route('/:key')
    .get(function(req, res) {
        console.log(res.body);
        basededatos.ref('vehiculos/' + req.params.key).once('value').then(dato => {
            res.send(dato.val());
        })
    })

//método DELETE se debe enviar identificación
.delete(function(req, res) {
    basededatos.ref('vehiculos/' + req.params.key).remove().then(p => {
        res.send('Los datos se eliminaron exitosamente');
    }).catch(err => {
        console.log(err);
    })
});

module.exports.ruta = router