import React,{useReducer} from 'react';
import {v4 as uuid} from 'uuid';
// Context y reducer
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
// Types
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO
} from '../../types';

import clienteAxios from '../../config/axios';

const ProyectoState = props => {


  const initialState = {
    proyectos : [],
    formulario: false,
    errorformulario: false,
    proyecto: null
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
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get('/api/proyectos');
      console.log(resultado);
      // Obtiene todos los proyectos
      dispatch({
        type: OBTENER_PROYECTO,
        payload: resultado.data.proyectos
      })
    } catch (error) {
      console.log(error);
    }
  }

  // Agregar nuevo proyecto
  const agregarProyecto = async proyecto => {
    try {
      const resultado = await clienteAxios.post('/api/proyectos', proyecto);
      console.log(resultado);
      // Insertar el proyecto en el state
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data
      })
    } catch (error) {
      console.log(error);
    }

  }

  // Validar formulario por errores
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    })
  }

  // Selecciona el proyecto que el usuario ha clicado
  const proyectoActual = proyectoId => {
    dispatch({
      type:PROYECTO_ACTUAL,
      payload: proyectoId
    })
  }

  // Elimina un proyecto
  const eliminarProyecto = proyectoId => {
    dispatch({
      type:ELIMINAR_PROYECTO,
      payload: proyectoId
    })
  }

  return(
    <proyectoContext.Provider
        value={{
          proyectos: state.proyectos,
          formulario: state.formulario,
          errorformulario: state.errorformulario,
          proyecto: state.proyecto,
          mostrarFormulario,
          obtenerProyectos,
          agregarProyecto,
          mostrarError,
          proyectoActual,
          eliminarProyecto
        }}
      >
      {props.children}
    </proyectoContext.Provider>
  )
}

export default ProyectoState;
