let pagSiguiente = ''
let pagAnterior = ''

async function obtenerPersonajes(link = 'https://rickandmortyapi.com/api/character') {
    try{
        const res = await fetch(link)
        if(!res.ok){
            console.error("Error al obtener datos");
            return null;
        }
        const data = await res.json()
        return data
    } catch(error){
        console.log("Error al conectar con la API: ", error)
        return null;
    }
}

function mostrarCarta(elemento) {
    let colorStatus = '';
    if(elemento.status == "Alive"){
        colorStatus = "green";
    } else if(elemento.status == "Dead"){
        colorStatus = "red";
    } else {
        colorStatus = 'black';
    }
    const contenedor = document.getElementById('AllCharacters');
    const cardHTML = `
        <div class="card mb-3" style="max-width: 540px;" id="cartaCharacter" >  
            <div class="row g-0">
                <div class="col">
                    <img src="${elemento.image}" class="img-fluid rounded-start" alt="Imagen de ${elemento.name}">
                </div>
                <div class="col">
                    <div class="card-body">
                        <h5 class="card-title"><b id="nombre">${elemento.name}</b></h5>
                        <p class="card-text">${elemento.species}</p>
                        <p class="card-text">Estado: <small class="" style="color: ${colorStatus};">${elemento.status}</small></p>
                        <p class="card-text">Genero: ${elemento.gender}</p>
                        <p class="card-text"><small class="text" style="color:black;">Origen: ${elemento.origin.name}</small></p>
                    </div>
                </div>
            </div>
        </div>`;
    contenedor.innerHTML += cardHTML;
}

async function mostrarPersonaje(pagina) {
    const data = await obtenerPersonajes(pagina)
    if(!data){
        return
    }
    
    pagSiguiente = data.info.next
    pagAnterior = data.info.prev
    
    const contenedorr = document.getElementById('AllCharacters');
    contenedorr.innerHTML = '';

    data.results.forEach(element => {
        mostrarCarta(element)
    });
    btnPrev.disabled = !data.info.prev;
    btnNext.disabled = !data.info.next;
}

async function busqueda(id) {
    const res = await fetch(`https://rickandmortyapi.com/api/character?name=${id}`)
    if (!res.ok) {
        console.log("No se ha encontrado el personaje");
        alert("No se ha encontrado el personaje");
        document.getElementById('inputBuscar').value = ''
        return null
    }
    const datos = await res.json()
    pagSiguiente = datos.info.next
    pagAnterior = datos.info.prev
    const tarjeta = document.getElementById('AllCharacters')
    tarjeta.innerHTML = ''
    if(datos.results.length > 1){
        datos.results.forEach(element => {
            mostrarCarta(element)
        });
    } else if(datos.results.length == 1){
        mostrarCarta(datos)
    } else{
        alert("Se debe ingresar un nombre primero, para poder realizar la busqueda!")
        mostrarPersonaje()
    }
     
}

const btnPrev = document.getElementById("anterior")
const btnNext = document.getElementById("siguiente")

btnNext.addEventListener('click', async ()=>{
    if(pagSiguiente){
        mostrarPersonaje(pagSiguiente)
    } else {
        alert("Estás en el final")
    }
})
btnPrev.addEventListener('click', ()=>{
    if(pagAnterior){
        mostrarPersonaje(pagAnterior)
    } else {
        alert("Estás en el inicio")
    }
})

const btnBuscar = document.getElementById('btnBuscar')
btnBuscar.addEventListener('click', () =>{
    const a = document.getElementById('inputBuscar').value
    busqueda(a)
})
mostrarPersonaje()