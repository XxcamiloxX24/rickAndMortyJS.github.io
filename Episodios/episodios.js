async function metodo(page) {
    const res = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
    if(!res.ok){
        console.error(`Error al obtener episodios de la página ${page}`);
        return;
    }
    const data = await res.json()
    for (const element of data.results) {
        const personajes = await obtenerPersonajes(element.characters);
        document.getElementById('cap').innerHTML += 
        `<div class="d-flex position-relative" id="capituloCard">
            <div id ="epis">
                <h5 class="mt-0" style="width="100%;" id="title"><b id="ti">${element.id}. ${element.name}</b></h5>
                <div id="img-continuar">
                    <i class="bi bi-play-circle-fill"></i>
                </div>
                <h6 class="mt-0">${element.air_date}</h6>
                <div class="accordion" id="accordionExample${element.id}">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${element.id}" aria-expanded="true" aria-controls="collapseOne">
                                Personajes
                            </button>
                        </h2>
                        <div id="collapse${element.id}" class="accordion-collapse collapse" data-bs-parent="#accordionExample${element.id}">
                            <div class="accordion-body">
                                <p>${personajes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    };
}

async function obtenerPersonajes(linkDelPersonaje) {
    const resultadoLink = await Promise.all(linkDelPersonaje.map(async (link) => {
        let id = link.substring(42);
        const personaje = await mostrarPersonaje(id)
        console.log(personaje);
        
        return personaje ? personaje.name : 'Desconocido...';
    }))
    
    return resultadoLink.join(', ')
}

async function mostrarPersonaje(link){
    try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${link}`);
        if (!res.ok) throw new Error(`Error al obtener personaje ${link}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
    
}
metodo(1)

//Funcion para la anterior página
async function anterior() {
    const i = document.getElementById("title").textContent
    let num = i.substring(0,1)
    console.log(num)
    if(num == "1"){
        document.getElementById("cap").innerHTML = ''
        metodo(1)
    } else if(num == "2"){
        document.getElementById("cap").innerHTML = ''
        metodo(1)
    } else if(num == "4"){
        document.getElementById("cap").innerHTML = ''
        metodo(2)
    }
}

//Funcion para la siguiente página
async function siguiente() {
    const i = document.getElementById("title").textContent
    let num = i.substring(0,1)
    console.log(num)
    if(num == "1"){
        document.getElementById("cap").innerHTML = ''
        metodo(2)
    } else if(num == "2"){
        document.getElementById("cap").innerHTML = ''
        metodo(3)
    } else if(num == "4"){
        document.getElementById("cap").innerHTML = ''
        metodo(3)
    }
}

const btnprim = document.getElementById("primer")
const btnSeg = document.getElementById("seg")
const btnTer = document.getElementById("ter")
const btnPrev = document.getElementById("anterior")
const btnNext = document.getElementById("siguiente")
btnprim.addEventListener('click', ()=>{
    document.getElementById("cap").innerHTML = ''
    metodo(1)
})
btnSeg.addEventListener('click', ()=>{
    document.getElementById("cap").innerHTML = ''
    metodo(2)
})
btnTer.addEventListener('click', ()=>{
    document.getElementById("cap").innerHTML = ''
    metodo(3)
})
btnNext.addEventListener('click', ()=>{
    siguiente()
})
btnPrev.addEventListener('click', ()=>{
    anterior()
})
