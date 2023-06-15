import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Consultas from './Consultas';
import Menu from './Navbar';

export default function MenuAdmin ({url, urlServImg ,setMAlerta, setMostrar}) {

  const navigate = useNavigate();

  useEffect(() => {
    const cabecera = {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},             
      body: JSON.stringify({ accion:'comprobarUsu' }),
      credentials: 'include'
    };
  
    fetch(url, cabecera)
      .then(response => response.json())
      .then(datos => {
        setUsuario(datos.usuario);
        setTipo(datos.tipo);
      });
  }, [url]);
  
  const [error, setError] = useState(false);
  const [texto, setTexto] = useState();

  const [cocheUsu, setCocheUsu] = useState([]);

  const [usuario, setUsuario] = useState([]);
  const [tipo, setTipo] = useState([]);

  const ConsulMat = () => {
    // Recogemos el texto de los campos usuario y contraseña
    let matricula = document.getElementById("formMatricula").value;

    const cabecera = {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},             
        body: JSON.stringify({ accion:'leercoche', matricula: matricula })
      };

      fetch(url, cabecera)
      .then(response => response.json())
      .then(datos => {
        if (datos===null){
          setError(true);
          setTexto("EM");
        }else{
          setCocheUsu(datos);
          setVisibleMa(true);
          setError(false);
        }

      });                
  }

  const [visibleMa, setVisibleMa] = useState(false);

  const [dniUsu, setDNIUsu] = useState();

  const [cochesUsu, setCochesUsu] = useState([]);

  const consulDNI = () => {
    // Recogemos el texto de los campos usuario y contraseña
    let DNI = document.getElementById("formDNI").value;

    const cabecera = {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},             
        body: JSON.stringify({ accion:'leercochesusu', DNI: DNI })
      };

      fetch(url, cabecera)
      .then(response => response.json())
      .then(datos => {
        if (datos.length===0){
          setError(true);
          setTexto("EU");
        }else{
          setCochesUsu(datos);
          setVisibleDNI(true);
          setDNIUsu(DNI);
          setError(false);
        }

      });                
  }

  const [visibleDNI, setVisibleDNI] = useState(false);

  const [estados, setEstados] = useState([]);

    useEffect(() => {
        if (url) {
        const cabecera = {
          method:'POST',
          headers: { 'Content-Type': 'application/json'},             
          body: JSON.stringify({ accion:'estadovehiculo'})
        };
  
        fetch(url, cabecera)
        .then(response => response.json())
        .then(datos => {
          setEstados(datos);
        });
      }
    }, [url]);

  if ( url !== "" && usuario && tipo==="Administrador"){
    return ( 
    <>
      <Menu tipo={tipo} url={url} setMAlerta={setMAlerta} setMostrar={setMostrar}/>    
      <div id="caja_menu">
        <h3>PANEL DE ADMINISTRACIÓN</h3>
      </div>
      
      <div style={{display: 'flex'}}>
        <div className='Consultas'>
          <p>Consultas</p>
          <Form>
            <Form.Group className="mb-3" controlId="formMatricula">
              <Form.Label>Matricula del coche</Form.Label>
              <Form.Control type="text" placeholder="Introduzca la matrícula a consultar"/>
              <Button onClick={ConsulMat} variant="primary" value="Matricula">Comprobar matricula</Button>
              <Consultas
                titulo="Comprobar matrícula"
                visible={visibleMa}
                datos={cocheUsu}
                estados={estados}
                urlServImg={urlServImg}
                cerrar={() => {setVisibleMa(false)}}
                tamano="lg"
              />
              { 
                error && texto==="EM" && <Alert key="danger" variant="danger">No se ha encontrado la matrícula</Alert>
              }
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDNI">
              <Form.Label>DNI propietario</Form.Label>
              <Form.Control type="text" placeholder="Introduzca el DNI a consultar"/>
              <Button onClick={consulDNI} variant="primary" value="DNI">Comprobar DNI</Button>
              <Consultas 
                titulo="Comprobar vehiculos asociados a DNI"
                visible={visibleDNI}
                datos={cochesUsu}
                usuario={dniUsu}
                estados={estados}
                urlServImg={urlServImg}
                cerrar={() => {setVisibleDNI(false)}}
                tamano="lg"
              />
              { 
                error && texto==="EU" && <Alert key="danger" variant="danger">No se ha encontrado al cliente</Alert>
              }
            </Form.Group>
          </Form>
        </div>

        <div className='Modificaciones'>
          <p>Modificaciones</p>
          <Button><Link to={process.env.PUBLIC_URL + `/MenuAdm/ModClientes`} className='text-link'>Clientes</Link></Button>
          <Button><Link to={process.env.PUBLIC_URL + `/MenuAdm/ModVehiculos`} className='text-link'>Vehiculos</Link></Button>
        </div>
      </div>

    </>
    
    )
  }else if (url !== "" && usuario && tipo==="Cliente"){
    return (
      <>
        <Alert className="text-center h4" key="danger" variant="danger">Zona restringida pinche pendejo</Alert>
      </>
    )
    
  }else {
    return (
      navigate(process.env.PUBLIC_URL + `/`)
    )
  }
}
