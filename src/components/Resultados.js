import React from 'react';
import  { useEffect, useState } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom'; //captura lo enviado en el history del buscador
import axios from 'axios';
import swAlert from '@sweetalert/with-react'

function Resultados(props){
    let token = sessionStorage.getItem('token');
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');

    const location = useLocation(); //detecta cuando cambia la url.
    const [ result, setResult ] = useState(keyword); 

    const [movieResults, setMovieResults] = useState([]);

    useEffect(() => { 
        setResult(keyword);
    }, [location]); //renderiza cuando cambia la url 

    useEffect(() => { 
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=1eb48cddb2188779e300ec0e90e2865d&language=es-ES&query=${keyword}`;
        axios.get(endPoint)
            .then (response => {
                const moviesArray = response.data.results;
                //console.log(moviesArray);
                if(moviesArray.length === 0){
                    swAlert("", "Tu búsqueda no arrojó resultados", "warning");
                } else{
                    setMovieResults(moviesArray); //seteo (actualizo) el estado diciendo que ya no es vacío
                }
                
            })
            .catch(error => {
                swAlert("", "Hubo errores. Intenta más tarde", "error");
            })
    }, [location]);

    return(
        <>
            {!token && <Navigate to ="/" />}

            <h2>Buscaste: <em>{result}</em></h2>

            {movieResults.length === 0 && <p>No hay resultados</p>}
            <div className='row'>
                
                {
                    movieResults.map((oneMovie, idx) => {
                        return(
                            <div className='col-4' key={ idx }>
                                <div className="card my-4">
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                                    <button 
                                        className='favourite-btn'
                                        onClick={props.addOrRemoveFromFavs}
                                        data-movie-id={oneMovie.id}>
                                        {/* { !props.favorites.length ? 💗 : 🖤 } */}
                                        🖤
                                        </button>
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
    )
}

export default Resultados;