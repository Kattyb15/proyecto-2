console.log("Entro index.js");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const inputTitulo = document.getElementById("inputTitulo");
const inputDescripcion = document.getElementById("inputDescripcion");

const btnAgregar = document.getElementById("btnAgregar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");

const divTareas = document.getElementById("divTareas");

let indexEditar = null;

class Tarea {
    constructor(titulo, descripcion) {
        this.titulo = titulo;
        this.descripcion = descripcion;
    }
}

function guardarTarea() {
    let titulo = inputTitulo.value;
    let descripcion = inputDescripcion.value;

    let tarea = new Tarea(
        titulo,
        descripcion
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
    inputDescripcion.value = tareaAEditar.descripcion;
    indexEditar = index;
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas();
}

function mostrarTareas() {
    if (tareas.length === 0) {
        divTareas.innerHTML = `
        <div class="alert alert-info" role="alert" id="alertSinTareas">
            No hay tareas agregadas
        </div>`;
    } else {
        divTareas.innerHTML = "";
        tareas.forEach((tarea, index) => {
            divTareas.innerHTML += `
                <div class="card mb-3">
                   <div class="row g-0">
                      <div class="col-md-8">
                         <div class="card-body">
                            <h5 class="card-title">${tarea.titulo}</h5>
                            <p class="card-text">${tarea.descripcion}</p>
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
    inputDescripcion.value = "";
}

btnAgregar.addEventListener("click", guardarTarea);
btnBorrarTodo.addEventListener("click", borrarTodo);

mostrarTareas();
