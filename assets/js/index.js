console.log("Entro index.js");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const inputTitulo = document.getElementById("inputTitulo");
const inputDiadeentrega = document.getElementById("inputDiadeentrega");
const inputMateria = document.getElementById("inputMateria");
const inputSinopsis = document.getElementById("inputSinopsis");

const btnAgregar = document.getElementById("btnAgregar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");

const divtareas = document.getElementById("divTareas");
const alertSinTareas = document.getElementById("alertSinTareas");

let indexEditar = null;

class Tarea {
    constructor(titulo, diadeentrega, materia, sinopsis) {
        this.titulo = titulo;
        this.diadeentrega = diadeentrega;
        this.materia = materia;
        this.sinopsis = sinopsis;
    }
}

function guardarTarea() {
    let titulo = inputTitulo.value;
    let diadeentrega = inputDiadeentrega.value;
    let materia = inputMateria.value;
    let sinopsis = inputSinopsis.value;

    let tarea = new Tarea(
        titulo,
        diadeentrega,
        materia,
        sinopsis
    );

    if (indexEditar === null) {
        tareas.push(tarea);
    } else {
        tareas[indexEditar] = tarea;
        indexEditar = null;
    }
    limpiarFormularioTareas();
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas();
}

function borrarTodo() {
    localStorage.clear();
    tareas = [];
    mostrarTareas();
    alert("Se borraron las tareas");
}

function editarTarea(index) {
    let tareaAEditar = tareas[index];
    inputTitulo.value = tareaAEditar.titulo;
    inputDiadeentrega.value = tareaAEditar.diadeentrega;
    inputMateria.value = tareaAEditar.materia;
    inputSinopsis.value = tareaAEditar.sinopsis;
    indexEditar = index;
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas();
}

function mostrarTareas() {
    if (tareas.length === 0) {
        divtareas.innerHTML = `
        <div class="alert alert-info" role="alert" id="alertSinTareas">
            No hay tareas agregadas
        </div>`;
    } else {
        divtareas.innerHTML = "";
        tareas.forEach((tarea, index) => {
            divtareas.innerHTML += `
                <div class="card mb-3">
                   <div class="row g-0">
                      <div class="col-md-8">
                         <div class="card-body">
                            <h5 class="card-title">${tarea.titulo}</h5>
                            <h6 class="card-subtitle mb-2 text-body-success">${tarea.diadeentrega} - ${tarea.materia}</h6>
                            <p class="card-text">${tarea.sinopsis}</p>
                            <div class="row mb-2">
                               <div class="col">
                                  <button class="btn btn-info w-100 mt-2" type="button" id="editar-${index}" onclick="editarTarea(${index})">Editar</button>
                               </div>
                               <div class="col">
                                  <button class="btn btn-success w-100 mt-2" type="button" id="eliminar-${index}" onclick="eliminarTarea(${index})">Eliminar</button>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            `;
        });
    }
}

function limpiarFormularioTareas() {
    inputTitulo.value = "";
    inputDiadeentrega.value = "";
    inputMateria.value = "";
    inputSinopsis.value = "";
}

btnAgregar.addEventListener("click", guardarTarea);
btnBorrarTodo.addEventListener("click", borrarTodo);

mostrarTareas();
