import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8080/api/libros';

export default function App() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: '', autor: '', isbn: '' });

  useEffect(() => {
    cargarLibros();
  }, []);

  async function cargarLibros() {
    try {
      setCargando(true);
      const respuesta = await fetch(API_URL);
      if (!respuesta.ok) throw new Error('No se pudo cargar la lista de libros');
      const datos = await respuesta.json();
      setLibros(datos);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  async function agregarLibro(evento) {
    evento.preventDefault();
    if (!nuevoLibro.titulo || !nuevoLibro.autor) return;

    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoLibro),
      });
      if (!respuesta.ok) throw new Error('No se pudo agregar el libro');
      setNuevoLibro({ titulo: '', autor: '', isbn: '' });
      cargarLibros();
    } catch (err) {
      setError(err.message);
    }
  }

  async function cambiarPrestamo(libro) {
    const accion = libro.disponible ? 'prestar' : 'devolver';
    try {
      const respuesta = await fetch(`${API_URL}/${libro.id}/${accion}`, { method: 'POST' });
      if (!respuesta.ok) throw new Error(`No se pudo ${accion} el libro`);
      cargarLibros();
    } catch (err) {
      setError(err.message);
    }
  }

  async function eliminarLibro(id) {
    try {
      const respuesta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!respuesta.ok) throw new Error('No se pudo eliminar el libro');
      cargarLibros();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <header>
        <h1>Biblioteca</h1>
        <p>Proyecto integrador — React + Spring Boot + MySQL</p>
      </header>

      {error && <div className="error">{error}</div>}

      <form className="form" onSubmit={agregarLibro}>
        <input
          placeholder="Titulo"
          value={nuevoLibro.titulo}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })}
        />
        <input
          placeholder="Autor"
          value={nuevoLibro.autor}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, autor: e.target.value })}
        />
        <input
          placeholder="ISBN (opcional)"
          value={nuevoLibro.isbn}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, isbn: e.target.value })}
        />
        <button type="submit">Agregar libro</button>
      </form>

      {cargando ? (
        <p>Cargando libros...</p>
      ) : (
        <ul className="lista">
          {libros.map((libro) => (
            <li key={libro.id} className={libro.disponible ? '' : 'prestado'}>
              <div>
                <strong>{libro.titulo}</strong>
                <span> — {libro.autor}</span>
                <span className="estado">
                  {libro.disponible ? 'Disponible' : `Prestado desde ${libro.fechaPrestamo}`}
                </span>
              </div>
              <div className="acciones">
                <button onClick={() => cambiarPrestamo(libro)}>
                  {libro.disponible ? 'Prestar' : 'Devolver'}
                </button>
                <button onClick={() => eliminarLibro(libro.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
