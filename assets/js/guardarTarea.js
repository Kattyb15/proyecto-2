function guardarTarea() {
    let titulo = inputTitulo.value;
    let descripcion = inputDescripcion.value;

    let tarea = new tarea(
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
