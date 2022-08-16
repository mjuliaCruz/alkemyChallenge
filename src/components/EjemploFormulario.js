// import { useState } from "react";
// function Formulario () {
//     //almacenar el estado de los imput como un objeto de los datos formulario
//     const [datos, setDatos] = useState({
//         nombre: "",
//         apellido: ""
//     })

//     //segundo estado para indicar si el form se ha llenado
//     const [formLleno, setFormLLeno] = useState(false)

//     //Eventos
//     const manejoCambioTexto = (e) =>{
//         //e.target.name = hace referencia al atributo 
//         //e.target.value = hace referencia al valor del atributo
//         setDatos({
//             ...datos,
//             [e.target.name] : e.target.value
//         })
//     }

//     //onSubmit
//     const enviarDatos = (evnt) =>{
//         evnt.preventDefault()
//         setFormLLeno(true)
//     }

// //en el condicional con el operador ternario, si el form se ha llenado, se mostrará el majs
//     return(
//         <>
//         {
//             formLleno ?
//             <h3>Gracias por suscribirte {datos.nombre} {datos.apellido}</h3>
//             :
//             <form action="" onSubmit={enviarDatos}>
//             <div>
//                 <input 
//                 type="text"
//                 placeholder="Nombre"
//                 name="nombre"
//                 onChange={manejoCambioTexto}             
//                 />
//             </div>
//             <div>
//                 <input 
//                 type="text"
//                 placeholder="apellido"
//                 name="apellido"
//                 onChange={manejoCambioTexto} 
//                 />
//             </div>
//             <div>
//                 <button type="submit" className="btn btn-primary">Envia</button>
//             </div>
//         </form>
//         } 
//         </>


//     )
// }

// export default Formulario