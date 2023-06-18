import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';

import ModalesClientes from './ModalesClientes';
import Alerta from './Alerta';

export default function Login ({onIdentificar,onTipo,onNombre,url,urlImg}) {

  const abrirRegistro= () => {
    setVisible(true);
  }
  const [visible, setVisible] = useState(false);
  
  const [error, setError] = useState(false);

  function iniciarSesion(){
    // Recogemos el texto de los campos usuario y contraseña
    let DNI = document.getElementById("txtusu").value;
    let clave = document.getElementById("txtpas").value;

    var usuario = {
        DNI:DNI,
        clave:clave
    }

    const cabecera = {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},             
        body: JSON.stringify({ accion:'acceder', usuario: usuario }),
        credentials: 'include'
      };

      fetch(url, cabecera)
      .then(response => response.json())
      .then(datos => {
        if (datos.respuesta === true) {
            onIdentificar(datos.usuario);
            onTipo(datos.tipo);
            onNombre(datos.nombre);
        }else{
            setError(true);
        }},[url]);                
  }

  const [MAlerta, setMAlerta] = useState([]);
  const [mostrar, setMostrar] = useState(false);

  return (   
  <div className="contenedorLogin">
    <Alerta show={mostrar} 
              cerrar={() => {setMostrar(false)}}
              MAlerta={MAlerta}/>
    <Form id="form_login">
      <h2>ACCESO</h2>
      <Form.Group className="mb-3" controlId="txtusu">
        <Form.Label>DNI</Form.Label>
        <Form.Control type="text"  placeholder="DNI usuario" required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="txtpas">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Contraseña" required/>
      </Form.Group>
      <div className="Boton">
        <Button className="btn btn-primary" onClick={ iniciarSesion }>Acceder</Button>
        <Button className="btn btn-primary" onClick={ abrirRegistro }>Registrar</Button>
        <ModalesClientes
          registro={true}
          url={url}
          urlImg={urlImg}
          titulo="Registro"
          visible={visible}
          setMAlerta={setMAlerta}
          setMostrar={setMostrar}
          cerrar={() => {setVisible(false)}}
        />
      </div>
    </Form>
    { 
      error && <Alert id="AlertaUsu" key="danger" variant="danger">Usuario o contraseña incorrectos</Alert>
    }
  </div>

  )
}
