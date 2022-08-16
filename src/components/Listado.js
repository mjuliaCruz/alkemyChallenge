import React from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react'
import  { Link, Navigate } from 'react-router-dom'; //se debe guardar en una variable
import  { useEffect, useState } from 'react'; //hooks (herramientas que nos brinda React)


function Listado (props) {
    let token = sessionStorage.getItem('token');

    console.log(props);

    const [ moviesList, setMoviesList ] = useState([]); //useState devuelve dos elementos: el primero: valor del estado (moviesList)  y dos: funcion que permite actualizar el estado. En este caso le decimos que queremos inicializar con un array vacío.
                                                        //useState devuelve el valor que tenia antes y el nuevo que le dimos
                                                        //useState: 
    useEffect(() => { 
        const endPoint = "https://api.themoviedb.org/3/discover/movie?api_key=1eb48cddb2188779e300ec0e90e2865d&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
        axios.get(endPoint)
            .then (response => {
                const apiData = response.data;
                setMoviesList(apiData.results); //seteo (actualizo) el estado diciendo que ya no es vacío

                console.log(apiData);
            })
            .catch(error => {
                swAlert("Hubo errores. Intenta más tarde", "error");
            })

    }, [setMoviesList]);

    return(
        <>
            { !token && <Navigate to ="/" /> }
            
            <div className='row'>
                { /*Estructura básica*/ }
                {
                    moviesList.map((oneMovie, idx) => {
                        return(
                            <div className='col-3' key={ idx }>
                                <div className="card my-4">
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                                    <button 
                                        className='favourite-btn'
                                        onClick={props.addOrRemoveFromFavs}
                                        data-movie-id={oneMovie.id}
                                    >🖤</button>
                                    <div className="card-body">
                                        <h5 className="card-title">{ oneMovie.title.substring(0, 40) }</h5>
                                        <p className="card-text">{ oneMovie.overview.substring(0, 400) }...</p>
                                        <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-success">View detail</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        </>
    );
}

export default Listado
