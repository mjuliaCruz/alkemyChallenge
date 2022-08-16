import React, { useState, useEffect } from "react";

function EjemploContador(){ 

    //con el useState vemos el estado inicial del contador:
    const [contador, setContador] = useState(0); // inicia en cero y va aumentando con cada click

    useEffect(()=>{
        var cont = localStorage.getItem('contador');
        if(cont){
            cont = parseInt(cont, 10);
            setContador(++cont)
        }
    }, [])

    function handlerClick(){
        var counter = parseInt(contador, 10);
        setContador(counter+1);
        localStorage.setItem('contador', contador);
        console.log(counter);
    }

    function handlerReset(){
        setContador(0);
        localStorage.removeItem('contador');
    }

    return(
        <>
            <div>
                <p>Cantidad clicks { contador }</p>
                <button onClick={()=>handlerClick()}>click aquí</button>
                <button onClick={()=> handlerReset()}>Borrar contador</button>
            </div>    
        </>
    );
}

export default EjemploContador;

