import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [correo, setCorreo] = useState('');
  const [comentario, setComentario] = useState('');

  const actualizar_correo = (contenido) => {
    console.log("React actualizara correo con:", contenido)
    setCorreo(contenido);
  }

  const actualizar_comentario = (contenido) => {
    console.log("React actualizara comentario con:", contenido)
    setComentario(contenido);
  }

  const crear_comentario = () => {
    const apiOptions = {
      server: 'http://localhost:3000' // server local - desarrollo
    };
    if (process.env.REACT_APP_MODE === 'production') {
      apiOptions.server = 'https://ticket-deber-2023-78708ce1d15b.herokuapp.com' // server heroku - producción
    }

    console.log('React esta usando server: ', apiOptions.server);
    console.log("React creara comentario con:", correo, comentario)

    const path = '/api/comentarios/';
    const postdata = {
      correo: correo,
      comentario: comentario,
    };
    const url = `${apiOptions.server}${path}`;

    axios.post(url, postdata)
      .then(response => {
        if (response.status === 201) {
          alert("Comentario creado exitosamente")
          console.log('Comentario creado exitosamente', response.data);
        }
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  return (
    <div>
      <h1>Crear Comentario</h1>
      <p>Correo</p>
      <input
        type="text"
        value={correo}
        onChange={e => actualizar_correo(e.target.value)}
      />
      <p>Comentario</p>
      <input
        type="text"
        value={comentario}
        onChange={e => actualizar_comentario(e.target.value)}
      />
      <button onClick={crear_comentario}>Crear Comentario</button>
    </div>
  );
}

export default App;
