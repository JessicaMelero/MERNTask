import React, {useContext, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';
import PropTypes from 'prop-types';

const RutaPrivada = ({component: Component, ...props}) => {

  const authContext = useContext(AuthContext);
  const {autenticado, cargando, usuarioAutenticado} = authContext;

  useEffect(()=>{
    usuarioAutenticado();
    //eslint-disable-next-line
  }, [])

  if(cargando){
    return <p>Cargando...</p>
  }else {
    return (
      <Route
       {...props} render={props => !autenticado && !cargando ? (
         <Redirect to="/"/>
       ) : (
         <Component {...props} />
       )}/>
    )
  }
};
export default RutaPrivada;
