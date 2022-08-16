import React from 'react';
import axios from 'axios';

import  { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Detalle () {
    const [movie, setMovie] = useState();
    
    let token = sessionStorage.getItem('token');
    
    let query = new  URLSearchParams(window.location.search);
    let movieID = query.get('movieID');
    
    function formatDate(date){ 
        let newDate = date.split('-'); //split divide en un array por índice entre los guiones.
        newDate = newDate[2] + '/' + newDate[1] + '/' + newDate[0]; //le cambia el orden y lo separa con /
        return newDate //devuelve el nuevo orden.
    }

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=1eb48cddb2188779e300ec0e90e2865d&language=es-ES`;
        
        axios.get(endPoint)
            .then(response=> {
                let movieData = response.data;

                //configuramos la fecha para que se vea dd/mm/aaaa
                let date = formatDate(movieData.release_date);
                //movieData.release_date = date;
                //setMovie(movieData);
                setMovie({...movieData, release_date:date});
                console.log(movie);
            })
            .catch(error => {
                console.log(error);
            })
    }, [movieID]);
    
    return(
        <>
            { !token && <Navigate to ="/" /> }
            { !movie && <p>Cargando...</p>}
            {movie &&
            <>
            <h2>{movie.title}</h2>
            <div className='row'>
                <div className='col-4'>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie poster" />
                </div>
                <div className='col-8'>
                    <h5>Fecha de estreno: {movie.release_date}</h5>
                    <h5>Reseña:</h5>
                    <p>{movie.overview}</p>
                    <h5>Rating: {movie.vote_average}</h5>
                    <h5>Votos totales: {movie.vote_count}</h5>
                    <h5>Géneros:</h5>
                    <ul>
                        {movie.genres.map(oneGenre =>
                            <li key={oneGenre.id}>{oneGenre.name}</li>)}
                    </ul>
                </div>
            </div>
            </>
            } 
        </>   
    )  
}

export default Detalle;