import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = ({}) => {

  // Obtener state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {formulario} = proyectosContext;

  // State para proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre:''
  });

  // Extraer nombre de proyecto
  const {nombre} = proyecto;

  // Lee los contenidos del proyecto
  const onChangeProyecto = e => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    })
  }

  // Cuando el usuario envia un proyecto
  const onsubmitProyecto = e =>{
    e.preventDefault();

    // Validar proyectos

    // Agregar al state

    // Reiniciar el from

  }

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        >Nuevo proyecto
      </button>
      {
        formulario
        ?
        (
          <form
            className="formulario-nuevo-proyecto"
            onSubmit={onsubmitProyecto}
            >
            <input
              type="text"
              className="input-text"
              placeholder="Nombre del proyecto"
              name="nombre"
              value={nombre}
              onChange={onChangeProyecto}
            />
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Agregar proyecto"
            />
          </form>
        ) : null
      }
      </Fragment>
  );
}

export default NuevoProyecto;
