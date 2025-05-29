import './App.css'
import { useState } from 'react'

function App() {
  const [ cantidad, setCantidad ] = useState("");
  const [ mensaje, setMensaje ] = useState("");
  const [ dollar, setDollar ] = useState("USD");
  const [ euro, setEuro ] = useState("EUR"); 
  
  const handleCheck = () => {
    const number = parseFloat(cantidad);
    if (isNaN(number) || number <= 0){
      setMensaje("Por favor, introduce una cantidad válida mayor que cero")
    } else {
      setMensaje(`Cantidad válida: ${number} (${dollar} -> ${euro})`);
    }
  };
  
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Convertidor de Divisas</h1>

      {/* Cantidad */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="Cantidad">Cantidad:</label>
        <input
          type="number"
          id="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Ej: 100"
          style={{ marginLeft: "1rem", padding: "0.5rem" }}
        />
      </div>
       {/* Selección de monedas */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="from">De:</label>
        <select
          id="from"
          value={dollar}
          onChange={(e) => setDollar(e.target.value)}
          style={{ margin: "0 1rem", padding: "0.5rem" }}
        >
          <option value="USD">USD - Dólar</option>
          <option value="EUR">EUR - Euro</option>
        </select>
        <label htmlFor="to">A:</label>
        <select
          id="to"
          value={euro}
          onChange={(e) => setEuro(e.target.value)}
          style={{ marginLeft: "1rem", padding: "0.5rem" }}
        >
          <option value="USD">USD - Dólar</option>
          <option value="EUR">EUR - Euro</option>
        </select>
      </div>
      {/* Botón */}
      <button onClick={handleCheck} style={{ padding: "0.5rem 1rem" }}>
        Comprobar
      </button>

      {/* Mensaje */}
      {mensaje && (
        <p style={{ color: mensaje.includes("válida") ? "green" : "red" }}>
          {mensaje}
        </p>
      )}
    </main>
  );
}

export default App;