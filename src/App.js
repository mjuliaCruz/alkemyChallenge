//Libraries
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useState, useEffect} from 'react';

//Components
import Login from "./components/Login";
import Listado  from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favoritos from './components/Favoritos';
import EjemploContador from './components/EjemploContador';
import EjemploBooleano from './components/EjemploBooleano';
//import Ejemplo from './components/Ejemplo';

//Styles
import './css/app.css';
import './css/bootstrap.min.css';

function App() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
      const favsInLocal = localStorage.getItem('favs');//cuando se carga el componente, levanto los favoritos del localStorage
      
      console.log(favsInLocal);
      
      if(favsInLocal != null){ //Si son distitntos de nulo
          const favsArray = JSON.parse(favsInLocal); //lo parseo - le quita el formato json y le da formato objeto
          setFavorites(favsArray); //seteo los favoritos
      }
  }, []); 
  
  const addOrRemoveFromFavs = e => {
    const favMovies = localStorage.getItem('favs');

    let tempMoviesInFavs;

    if (favMovies === null){
      tempMoviesInFavs = [];
    }else{
      tempMoviesInFavs = JSON.parse(favMovies);
    }
  
    const btn = e.currentTarget; //hago click en el botón y levanto toda la información que sigue:
    const parent = btn.parentElement; //levanto toda la info del padre (<div>)
    const imgURL = parent.querySelector('img').getAttribute('src'); //levanto la imagen
    const title = parent.querySelector('h5').innerText; //levanto el texto del titulo
    const overview = parent.querySelector('p').innerText; //levanto el texto del detalle
    
    const movieData = {
      imgURL, title, overview, //armamos un objeto literal con la película que deseo agregar a favoritos
      id: btn.dataset.movieId //dataSet permite obtener los atributos data, en este caso el id de la pelicula
    }

    let movieIsInArray = tempMoviesInFavs.find(oneMovie => { //si no estaba la peli marcada, y la marco x 1º vez, da undefined
      return oneMovie.id === movieData.id                    //si ya estaba cargada, devuelve el objeto de la pelicula
    });
    
    if (!movieIsInArray){ //si la película no está en el localStorage, la agrega
      tempMoviesInFavs.push(movieData); //agrego, con cada click en el botón, esa película al array tempMoviesInFavs.
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs)); //cargo lo que tengo en la variable al localStorage
      setFavorites(tempMoviesInFavs); //seteo los favoritos
      console.log('Se agregó la película a favoritos');    
    } else {
      let moviesLeft = tempMoviesInFavs.filter(oneMovie => { 
        return oneMovie.id !== movieData.id
      });
      localStorage.setItem('favs', JSON.stringify(moviesLeft)); //quita la película del LocalStorage -- lo devuelve a formato json
      setFavorites(moviesLeft);
      console.log('Se eliminó la película de favoritos');    
    }                                                        
  }

  return (
    
    <BrowserRouter>
      
      <Header favorites={favorites} />    
      <div className="container">
      
        <Routes>
          <Route exact path="/" element={<Login />} />  {/*path: es la ruta en la que se tiene que */}
          <Route path="/listado" element= { <Listado addOrRemoveFromFavs={addOrRemoveFromFavs} /> } /> {/*le enviamos un props al componente, que se llama addOr..*/}
          {/* <Route path="/listado" render={ (props) => <Listado addOrRemoveFromFavs={addOrRemoveFromFavs} {...props} /> } /> */}
          <Route path="/detalle" element={<Detalle />} /> {/*Ingresa a ver el detalle de cada pelicula*/}
          <Route path="/contador" element={<EjemploContador />} /> {/*Ingresa al ejemplo de contador de clicks*/}
          <Route path="/ocultarInfo" element={<EjemploBooleano />} /> {/*Ingresa al ejemplo de ocultar o mostrar info con un click*/}
          { /* <Route path="/carritoDeCompras" element={<EjemploCarritoCompras />} /> {/*Ingresa al ejemplo de ocultar o mostrar info con un click*/}
          { /* <Route path="/ejemploNombres" element={<Ejemplo />} /> {/*Ingresa al ejemplo de ocultar o mostrar info con un click*/}
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/favoritos" element={<Favoritos favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
        </Routes>
      
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
