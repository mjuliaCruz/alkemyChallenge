import React from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react'
import { useNavigate, Navigate } from "react-router-dom";

function Login(){

    let history = useNavigate();

    const submitHandler = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        
        //expresión regular para el email:
        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(email === '' || password ===''){
            swAlert(
                <h2>Los campos no pueden estar vacíos</h2>
            );
            return;
        }

        if (email !== '' && !regexEmail.test(email)){
            swAlert("Debes escribir una dirección de correo electrónico válida", "", "error");
            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react'){ //el mail y la password tienen que ser iguales a estos
            swAlert("Credenciales inválidas", "", "warning");
            return;
        }

        console.log('Ok, estamos listos para enviar la información');

        axios
            .post('http://challenge-react.alkemy.org', { email, password }) //{email, password} ==> destructuring: creame un objeto para email y uno para password
            .then(res => {
                swAlert("Perfecto,", "ingresaste correctamente!", "success");
                const tokenRecibido = res.data.token; // la respuesta se guarda en el res de arriba
                sessionStorage.setItem('token', tokenRecibido); // guardo el token en el localStorage
                history("/listado");
                
            })
    }

    let token = sessionStorage.getItem('token');

    return(
        <>
            { token && <Navigate to ="/Listado" /> }
            <div className='row'>
                <div className='col-4 offset-1'>
                    <br />
                    <h2>Formulario de login</h2>
                    <form onSubmit={submitHandler}>
                        <label className='form-label d-block mt-2'>
                            <span>Correo electrónico:</span>
                            <br />
                            <input type= "email" className="form-control" placeholder="name@example.com" name = "email" />
                        </label>
                        <br />
                        <label className='form-label d-block mt-2'>
                            <span>Contraseña:</span>
                            <br />
                            <input type="password" className="form-control" name= "password" />
                        </label>
                        <br />
                        <br />
                        <button type = "submit" className="btn btn-success mt-2">Ingresar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;