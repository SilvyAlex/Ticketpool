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
    <div class="form-signin w-100 m-auto">
      <h1>Ticketpool</h1>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Correo</label>
        <input 
          type="email" 
          class="form-control" 
          id="exampleFormControlInput1" 
          placeholder="nombre@gmail.com" 
          value={correo} 
          onChange={e => actualizar_correo(e.target.value)} 
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Comentario</label>
        <textarea class="form-control" type="text" value={comentario} onChange={e => actualizar_comentario(e.target.value)} id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      
      <button class="btn btn-danger" onClick={crear_comentario}>Crear Comentario</button>
    </div>
  );
}

export default App;
