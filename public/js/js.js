const btnSearch = document.getElementById('search')
const popupCloseBtn = document.getElementById("close-popup");
const mealInfoEl = document.getElementById("meal-info");
const mealPopup = document.getElementById("meal-popup");

firebase.initializeApp({

    apiKey: "AIzaSyAkQIk3mtbxnijLcS7P0AQnjf1KRWa8MIw",
    authDomain: "services-e2042.firebaseapp.com",
    databaseURL: "https://services-e2042.firebaseio.com",
    projectId: "services-e2042",
    storageBucket: "services-e2042.appspot.com",
    messagingSenderId: "737765084297",
    appId: "1:737765084297:web:0a4d0f3e107816e2654a58",
    measurementId: "G-83G5X2QDL6"

})
var database = firebase.database();

getRandoMeal()
async function getRandoMeal() {


    // funcion para obtener los datos
    let arreglo = []
    database.ref('vehiculos').once('value').then(datos => {
        datos.forEach(nodo => {
            arreglo.push(nodo);
        })
        publications(arreglo)

    }).catch(q => {
        console.log(q)
    })
}

function publications(arreglo) {
    arreglo.forEach(element => {
        createPublications(element)
    });
}

function createPublications(arreglo) {
    // metodo para crear las publicaciones
    const mealsList = document.getElementById('meals')
    const publication = document.createElement('div')
    publication.innerHTML = `
        <div class="meal_header">
            <img src="${arreglo.val().img}"/>
            <alt="${arreglo.val().img}">
        </div>
        <div class="meal_body">
            <h4>${arreglo.val().placa}</h4>
            <h4>${arreglo.val().modelo}</h4>
            <button class="fav_btn">
                <i class="fas fa-trash-alt"></i>
            </button>
        `
    const btnProd = publication.querySelector('.meal_body .fav_btn')
    const headerPhoto = publication.querySelector('.meal_header')

    btnProd.addEventListener('click', () => {
        //eliminar publicacion
        database.ref('vehiculos/' + arreglo.key).remove().then(p => {
            alert('eliminado')
        });
    })

    headerPhoto.addEventListener('click', () => {

        // Mostrar informacion
        showEdit(arreglo)
    })

    mealsList.appendChild(publication)
}


function showEdit(arreglo) {

    //editar 
    mealInfoEl.innerHTML = ""
    const editpublic = document.createElement('div')

    editpublic.innerHTML = ` 
    <img src="${arreglo.val().img}"/>
    <h1>${arreglo.val().marca}</h1>
    <input type="text" class="marca" value="${arreglo.val().marca}"/>
    <input type="text" class="color" value="${arreglo.val().color}"/>
    <input type="text" class="direccion" value="${arreglo.val().direccion}"/>
    <button class="update_info">
                <i class="fas fa-paper-plane"></i>
    </button>
    `
    const btnupdate = editpublic.querySelector('.update_info')
    const marca1 = editpublic.querySelector('.marca')
    const color = editpublic.querySelector('.color')
    const direccion = editpublic.querySelector('.direccion')

    btnupdate.addEventListener('click', () => {
        const model = arreglo.key
        database.ref('vehiculos/' + model).set({
            placa: marca1.value,
            modelo: color.value,
            direc: direccion.value,

            img: "https://i.ytimg.com/vi/ycaHvERT4c8/maxresdefault.jpg",
            direccion: direccion.value
        })
        mealPopup.classList.add("hidden");
    })

    mealInfoEl.appendChild(editpublic)
    mealPopup.classList.remove("hidden")
}

popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});

btnSearch.addEventListener('click', function() {
    // guardar publication
    var placa = document.getElementById('placa')
    var marca = document.getElementById('marca')
    var modelo = document.getElementById('modelo')
    var año = document.getElementById('año')
    var motor = document.getElementById('motor')
    var color = document.getElementById('color')
    var combustible = document.getElementById('combustible')
    var direccion = document.getElementById('direccion')



    database.ref('vehiculos/' + placa.value).set({
        placa: placa.value,
        marca: marca.value,
        modelo: modelo.value,
        marca: placa.value,
        color: color.value,
        combustible: combustible.value,
        direccion: direccion.value,
        motor: motor.value,
        año: año.value,
        img: "https://i.ytimg.com/vi/ycaHvERT4c8/maxresdefault.jpg",
    })
    placa.innerHTML = ""
    marca.innerHTML = ""
    modelo.innerHTML = ""
    marca.innerHTML = ""
    combustible.innerHTML = ""
    direccion.innerHTML = ""
    motor.innerHTML = ""
    año.innerHTML = ""
    alert('CREADO!')
})