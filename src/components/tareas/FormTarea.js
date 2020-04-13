import React, {useContext, useState} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

  // Extraer si proyecto está activo
  const proyectosContext = useContext(proyectoContext);
  const {proyecto} = proyectosContext;

  // Obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const {errortarea, agregarTarea, validarTarea, obtenerTareas} = tareasContext;

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

    // agregar nueva tarea al state de tareas
    tarea.proyectoId = proyectoActual.id;
    tarea.estado = false;
    agregarTarea(tarea);

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
            value="Agregar tarea"
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
