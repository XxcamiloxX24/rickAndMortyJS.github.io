async function obtenerObjeto(link = 'https://rickandmortyapi.com/api/location') {
    try{
        const res = await fetch(link)
        if(!res.ok){
            console.error("Error al obtener datos");
            return null
        }
        const datos = await res.json()
        return datos 
    } catch (error){
        console.error(error);
    }
}

let linkSiguiente = ''
let linkAnterior = ''

async function obtenerLocation(pagina) {
    const res = await obtenerObjeto(pagina)
    if(!res){
        return
    }
    document.getElementById('locationsAll').innerHTML = ''
    linkSiguiente = res.info.next
    linkAnterior = res.info.prev
    
    res.results.forEach(element => {
        mostrarUbi(element)
    });
    
}

function mostrarUbi(lugar){
    const cartaUbicacion = document.getElementById('locationsAll')
        const cardHTML = `<div class="card border-secondary mb-3" style="max-width: 18rem;">
            <div class="card-header">${lugar.name}</div>
            <div class="card-body text-secondary">
                <img src="../imagenes/unknown.jpg" class="img-fluid">
                <h5 class="card-title">${lugar.dimension}</h5>
                <p class="card-text">${lugar.type}</p>
                
            </div>
        </div>`
        
        cartaUbicacion.innerHTML += cardHTML
}

async function busqueda(id) {
    const res = await fetch(`https://rickandmortyapi.com/api/location?name=${id}`)
    if (!res.ok) {
        console.log("No se ha encontrado la ubicación");
        alert("No se ha encontrado la ubicación");
        document.getElementById('inputBuscar').value = ''
        return null
    }
    const datos = await res.json()
    linkSiguiente = datos.info.next
    linkAnterior = datos.info.prev
    const tarjeta = document.getElementById('locationsAll')
    tarjeta.innerHTML = ''
    console.log(datos);
    
    if(datos.results.length > 1){
        datos.results.forEach(element => {
            mostrarUbi(element)
        });
    } else if(datos.results.length == 1){
        mostrarUbi(datos)
    } else{
        alert("Se debe ingresar un nombre primero, para poder realizar la busqueda!")
        obtenerLocation()
    }
     
}

const btnPrev = document.getElementById("anterior")
const btnNext = document.getElementById("siguiente")

btnNext.addEventListener('click', async ()=>{
    if(linkSiguiente){
        obtenerLocation(linkSiguiente)
    } else {
        alert("Estás en el final")
    }
})
btnPrev.addEventListener('click', ()=>{
    if(linkAnterior){
        obtenerLocation(linkAnterior)
    } else {
        alert("Estás en el inicio")
    }
})

const btnBuscar = document.getElementById('btnBuscar')
btnBuscar.addEventListener('click' || 'submit', () =>{
    const a = document.getElementById('inputBuscar').value
    busqueda(a)
})
obtenerLocation()