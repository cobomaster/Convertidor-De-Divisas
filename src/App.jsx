import './App.css'
import { useState } from 'react'

function App() {
  const [ cantidad, setCantidad ] = useState("");
  const [ mensaje, setMensaje ] = useState("");
  
  const handleCheck = () => {
    const number = parseFloat(cantidad);
    if (isNaN(number) || number <= 0) {
      setMensaje("Por favor, introduce una cantidad válida mayor que cero.");
    } else {
      setMensaje(`Cantidad válida: ${number}`);
    }
    };

    return(
      <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif"}}>
        <h1> Convertidor de Divisas </h1>

        <label htmlFor='cantidad'> Cantidad: </label>
        <input 
        type="number"
        id="cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        placeholder="Ej: 100"
        style={{ margin: "0 1rem", padding: "0.5rem " }}
        />

       <button onClick={handleCheck} style={{padding: "0.5rem 1rem"}}>
        Comprobar
        </button>


       {mensaje && (
        <p style={{ color: mensaje.includes("válida") ? "green" : "red" }}>
          {mensaje}
        </p>
      )}
    </main>
  );
}


export default App
