import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

  // Extraer si proyecto está activo
  const proyectosContext = useContext(proyectoContext);
  const {proyecto} = proyectosContext;

  // Obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const {errortarea, tareaseleccionada, agregarTarea, validarTarea, obtenerTareas, actualizarTarea} = tareasContext;

  // Effect que detecta si hay una tarea seleccionada
  useEffect (() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: ''
      })
    }
  }, [tareaseleccionada]);

  // State del formulario
  const [tarea, guardarTarea] = useState({
    nombre:''
  });

  // Extraer nombre del proyecto
  const {nombre} = tarea;

  // Si no hay proyecto seleccionado
  if (!proyecto) return null;

  // Array destructuring para extraer el proyecto proyectoActual
  const [proyectoActual] = proyecto;

  // Leer los valores del formulario
  const handleChange = e =>{
      guardarTarea({
        ...tarea,
        [e.target.name] : e.target.value
      })
  }

  const onSubmit = e => {
    e.preventDefault();

    // validar
    if(nombre.trim() === '') {
      validarTarea();
      return;
    }

    // Revisa si es edicion o nueva tarea
    if (tareaseleccionada === null) {
      // agregar nueva tarea al state de tareas
      tarea.proyectoId = proyectoActual.id;
      tarea.estado = false;
      agregarTarea(tarea);
    } else {
      // actualizar tarea existente
      actualizarTarea(tarea);
    }

    // Obtener y filtrar tareas de proyecto proyecto actual
    obtenerTareas(proyectoActual.id);

    // reiniciar el form
    guardarTarea({
      nombre: ''
    })
  }

  return(
    <div className="formulario">
      <form
        onSubmit={onSubmit}
        >
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
            />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar tarea" : "Agregar tarea"}
            />
        </div>
      </form>
      {errortarea
        ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>
        : null}
    </div>
  )

}
export default FormTarea;
