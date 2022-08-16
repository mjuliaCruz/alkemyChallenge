import React, { useState, useEffect } from "react";


function Ejemplo(){ //ejemplo con STRINGS

    //1.usar la variable de estado para el nombre
    const [nombre, setNombre] = useState ("Maria");
    //usar el efecto para almacenar en el localStorage el dato del formulario.

    //2. usar la variable de estado del apellido
    const [apellido, setApellido] = useState ("Poppins");

    //3. usar el efecto para almacenar en el localStorage el dato del formulario.
    useEffect(() => {
        localStorage.setItem('formData', nombre)
    });

    //4. usar un efecto para la actualización del título por ejemplo
    useEffect(() => {
        document.title = `${nombre} ${apellido}`
    });

    return(
        <>
        
        </>
    )
}
export default Ejemplo;
