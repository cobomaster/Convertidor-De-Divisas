import './App.css';
import { useState } from 'react';

function App() {
  const [cantidad, setCantidad] = useState("");
  const [origen, setOrigen] = useState("USD");
  const [destino, setDestino] = useState("EUR");
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    const cantidadNum = parseFloat(cantidad);

    if (isNaN(cantidadNum) || cantidadNum <= 0) {
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
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${cantidadNum}&from=${origen}&to=${destino}`);
      const data = await res.json();
      if (data.rates && data.rates[destino]) {
        setResultado(data.rates[destino].toFixed(2));
      } else {
        setError("No se pudo obtener la conversión");
        setResultado(null);
      }
    } catch {
      setError("Error al conectar con la API");
      setResultado(null);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Convertidor de Divisas</h1>

      <input
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        placeholder="Cantidad"
      />

      <div className="select-row">
        <select value={origen} onChange={(e) => setOrigen(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="MXN">MXN</option>
        </select>

        <span className="arrow">→</span>

        <select value={destino} onChange={(e) => setDestino(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="MXN">MXN</option>
        </select>
      </div>

      <button onClick={handleConvert}>Convertir</button>

      {cargando && <p className="loading">Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {resultado && (
        <p className="result">
          {cantidad} {origen} = <strong>{resultado} {destino}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
