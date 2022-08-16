import React from 'react';
import { Link } from 'react-router-dom'; //se comporta como un enlace, pero permite que no se refresque la página

//componentes
import Buscador from './Buscador';

function Header(props){

    return(
        <header>
            <nav className="navbar navbar-expand-md bg-black">
            <div className="container-fluid collapse navar-collapse">
                <ul className="navbar-nav"> 
                    <a className="navbar-brand text-light">AlkemyChallenge</a>
                    <li className="nav-item">
                        <Link to="/" className="navbar-brand text-light">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/listado" className="navbar-brand text-light">Listado</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/favoritos" className="navbar-brand text-light">Favoritos</Link>
                    </li>
                    <li className="nav-item">
                        <span className="navbar-brand text-success">
                            {
                                props.favorites.length > 0 && <>Películas en Favoritos: {props.favorites.length}</>
                            }
                                
                            {/* Películas en favoritos: {localStorage.length} */}
                        </span>
                    </li>
                    {/*
                    <li className="nav-item">
                        <Link to="/contador" className="navbar-brand text-light">Contador de Clicks</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ocultarInfo" className="navbar-brand text-light">Ocultar info</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/carritoDeCompras" className="navbar-brand text-light">Carrito de Compras</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/ejemploNombres" className="navbar-brand text-light">Ejemplo Nombres</Link>
                    </li>
                    */}
                </ul>
                </div>     
            <Buscador />   
            </nav>
        </header> 
    )
}

export default Header;

