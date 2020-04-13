import React,{useReducer} from 'react';
// Context y reducer
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
// types
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO
} from '../../types';

const ProyectoState = props => {

  const proyectos = [
    {id: 1, nombre: 'Tienda Virtual'},
    {id: 2, nombre: 'Diseño sitio web'},
    {id: 3, nombre: 'Intranet'},
    {id: 4, nombre: 'MERN'}
  ]

  const initialState = {
    proyectos : [],
    formulario: false
  }

  // Dispatch para ejecutar las acciones
  const [ state, dispatch ] = useReducer(proyectoReducer, initialState);

  // Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    })
  }

  // Obtener los proyectos
  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTO,
      payload: proyectos
    })
  }

  return(
    <proyectoContext.Provider
        value={{
          proyectos: state.proyectos,
          formulario: state.formulario,
          mostrarFormulario,
          obtenerProyectos
        }}
      >
      {props.children}
    </proyectoContext.Provider>
  )
}

export default ProyectoState;
