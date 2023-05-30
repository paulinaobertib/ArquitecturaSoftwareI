import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import "./navbar.css"

//falta implementar logica de que si el usuario esta logueado me muestre su nombre

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={ () => navigate(-1)}>Volver</button>
      <Link to="/">Home</Link>
      <Link to="/Login">Iniciar Sesion</Link>
      <Link to="/Register">Registarse</Link>
    </nav>
  )
}

export default Navbar