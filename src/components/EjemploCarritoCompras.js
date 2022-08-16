import React, { useState, useEffect } from "react";

function EjemploCarritoCompras(){

    const [productos, setProductos] = useState(0);

    useEffect(() => {
        //*cada vez que se vuelva a renderizar (actualizar) el componente aparecerá este mensaje.
        console.log('Agregaste un producto al carrito de compras');
    }, [productos]);
        //*al poner los productos entre corchetes, le decimos que solo actualice el sitio cuando se modifiquen los
        //productos que cargamos en el carrito.
        //*Cuando necesitamos ejecutar algun código solo la primera vez que el componente aparece, vamos a pasarle el
        //estado por los corchetes.
        //*Con los corchetes se carga por primera vez el componente y luego se actualiza.

        const agregarProd = () => {

        }
    return(
        <>

        </>
    )
}

export default EjemploCarritoCompras;
