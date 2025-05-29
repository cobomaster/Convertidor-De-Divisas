import './App.css'
import { useState } from 'react'

function App() {
  const [cantidad, setCantidad] = useState("");
  const [origen, setOrigen] = useState("USD");
  const [destino, setDestino] = useState("EUR");
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    if (!cantidad || isNaN(cantidad) || Number(cantidad) <= 0) {
      setError("Introduce una cantidad válida");
      setResultado(null);
      return;
    }

    if (origen === destino) {
      setError("Elige divisas diferentes para convertir");
      setResultado(null);
      return;
    }

    setError("");
    setCargando(true);

    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${cantidad}&from=${origen}&to=${destino}`
      );
      const data = await res.json();

      if (data.rates && data.rates[destino]) {
        setResultado(data.rates[destino].toFixed(2));
      } else {
        setError("No se pudo obtener la conversión");
      }
    } catch (err) {
      setError("Error al conectar con la API");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Convertidor de Divisas</h1>

      <input
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        placeholder="Cantidad"
      />

      <select value={origen} onChange={(e) => setOrigen(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>

      <span> → </span>

      <select value={destino} onChange={(e) => setDestino(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>

      <br />
      <button onClick={handleConvert} style={{ marginTop: "1rem" }}>
        Convertir
      </button>

      {cargando && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {resultado && (
        <p>
          {cantidad} {origen} = <strong>{resultado} {destino}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
