import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState, useEffect } from 'react';

import Menu from './Navbar';

export default function MenuUsu ({url}) {
  
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
        setNombre(datos.nombre);
      });
  }, [url]);

  const [usuario, setUsuario] = useState([]);
  const [tipo, setTipo] = useState([]);
  const [nombre, setNombre] = useState([]);

  const [cochesUsu, setCochesUsu] = useState([]);
  
  useEffect(() => {
    const cabecera = {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},             
      body: JSON.stringify({ accion:'leercochesusu', DNI: usuario})
    };
  
    fetch(url, cabecera)
      .then(response => response.json())
      .then(datos => {
        setCochesUsu(datos);
      });
  }, [url,usuario]);

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

  if ( url !== "" && Object.keys(cochesUsu).length !== 0 && usuario && tipo==="Cliente"){
    const pagar=(estados.filter((estado) => cochesUsu.find((coche) => coche.Matricula === estado.Matricula && coche.DNI === usuario)).reduce((total, estado) => total + parseFloat(estado.Pagar), 0).toFixed(2))
  return ( 
  <>
    <Menu usuario={nombre} tipo={tipo} pagar={pagar} url={url}/>
      
    <Accordion defaultActiveKey='0'>
      {cochesUsu.filter((coche) => coche.DNI === usuario).map((coche, index) => {
      // Buscamos el estado del vehículo en el array 'estados'
      const estadoVehiculo = estados.find((estado) => estado.Matricula === coche.Matricula);
      let numero = '0'; 
      if (index) {
        numero = 0 === index ?
          '0':
          {index};      
      }
      let estadoTexto = "No ha efectuado ninguna entrada";
      if (estadoVehiculo) {
        estadoTexto = estadoVehiculo.Estado === "Dentro" ? 
          `Estado del vehiculo: Dentro - Fecha de entrada: ${estadoVehiculo.UltimaEntrada}` : 
          `Estado del vehiculo: Fuera - Fecha de salida: ${estadoVehiculo.UltimaSalida}`;
      }
      const aPagar = estadoVehiculo ? estadoVehiculo.Pagar : 0;
      return(
        <Accordion.Item eventKey={numero} key={index}>
          <Accordion.Header>{coche.Matricula}</Accordion.Header>
          <Accordion.Body>
          <div className="InfoVeh">
            <Row>
              <Col>
                <img style={{objectFit:"scale-down"}} alt="novedad" width="700px" height="400px" src={process.env.PUBLIC_URL + `/ImagenesCoches/CochesClientes/${coche.Imagen}`}></img>
                <p style={{margin: "20px", textAlign:"justify"}}>{estadoTexto}</p>
              </Col>
              <Col style={{margin:"auto", textAlign:"center"}}>
                <div >
                  <p style={{margin: "20px", textAlign:"center"}}>Marca: {coche.Marca}</p>
                  <p style={{margin: "20px", textAlign:"center"}}>Modelo: {coche.Modelo}</p>
                  <p style={{margin: "20px", textAlign:"center"}}>Color: {coche.Color}</p>
                  <p style={{margin: "20px", textAlign:"center"}}>Plaza: {coche.Plaza}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col></Col>
              <Col><h5 style={{textAlign:"right"}}>A pagar por este vehiculo: {aPagar}€</h5></Col>
            </Row>
          </div> 
          </Accordion.Body>
        </Accordion.Item>
    )
    })}
    </Accordion>
  </>
  
  )
  }else if ( url !== "" && usuario && tipo==="Cliente"){
    return ( 
      <>    
        <Menu usuario={nombre} tipo={tipo} pagar={0}/>
        <p className="h5  text-center" id="SinVeh">
          No se han encontrado vehiculos asociados a su nombre.
          Para agregar algún vehículo, póngase en contacto con nosotros.
        </p>
      </>
    )
  }
}