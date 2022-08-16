import React from 'react';
import swAlert from '@sweetalert/with-react'
import { useNavigate } from 'react-router-dom';

function Buscador(){
    const history = useNavigate();

    const submitHandler = e =>{ //captura el evento
        e.preventDefault(); //hace que no se refresque la página al hacerle click en el buscador.
        const keyword = e.currentTarget.keyword.value.trim(); //capturamos la palabra que se escribió en el buscador. El elemento que generó el evento
        console.log(keyword);                                               // capturamos el valor del elemento que tenga el name: keyword
        
        if(keyword.length === 0){ 
            swAlert("", "Tienes que escribir una palabra clave para la búsqueda", "warning");
        } else if(keyword.length < 4){ //hay que escribir más de 3 letras en el buscador para que se convierta en palabra clave.
            swAlert("", "Tienes que escribir más de 3 caracteres", "warning");
        } else {
            //history(`/resultados?keyword=${keyword}`);
            history({
                pathname: '/resultados', 
                search: `?keyword=${keyword}`, 

                state: {detail: keyword}
            })
            e.currentTarget.keyword.value = '';
        }
    }

    return(
        <form className='d-flex align-item-center' onSubmit={submitHandler}>
            <label className='form-label mb-0 mx-2'>
                <input className="form-control" type="text" name ="keyword" placeholder='Buscar...' />
            </label>
            
            <button type ="submit" className="btn btn-success">Buscar</button>
            
        </form>
    
    )
}

export default Buscador;