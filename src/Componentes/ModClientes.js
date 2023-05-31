import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';
import { useState, useEffect } from "react";

import ModalesClientes from './ModalesClientes';
import CartaCliente from './CartaCliente';
import Alerta from './Alerta';
import Menu from './Navbar';

function ModClientes({url,urlImg,urlServImg}) {

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

  const [usuario, setUsuario] = useState([]);
  const [tipo, setTipo] = useState([]);

    const abrirCuadro= () => {
      setVisible(true);
    }
    
    const [visible, setVisible] = useState(false);

    const [datosClientes, setClientes] = useState([]);

    const [MAlerta, setMAlerta] = useState([]);

    const [mostrar, setMostrar] = useState(false);

    function leerClientes() {
      const cabecera = {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},             
        body: JSON.stringify({ accion:'leerclientesjson'})
      };
    
      fetch(url, cabecera)
        .then(response => response.json())
        .then(datos => {
          setClientes(datos);
        });
    };

    useEffect(() => {
      if (url) {
      const cabecera = {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},             
        body: JSON.stringify({ accion:'leerclientesjson'})
      };
    
      fetch(url, cabecera)
        .then(response => response.json())
        .then(datos => {
          setClientes(datos);
        });
      }
    }, [url]);

    if ( url !== "" && usuario && tipo==="Administrador"){
        return (
        <div className='Clientes'>
          <Menu tipo={tipo} url={url}/>
          <Alerta show={mostrar} 
              cerrar={() => {setMostrar(false)}}
              MAlerta={MAlerta}/>
            <h3>CLIENTES</h3>
            <Button onClick={abrirCuadro} variant="primary">Añadir cliente</Button>
            <ModalesClientes
                onLeer={function() {
                  leerClientes();
                }}
                url={url}
                urlImg={urlImg}
                titulo="Añadir cliente"
                visible={visible}
                setMAlerta={setMAlerta}
                setMostrar={setMostrar}
                cerrar={() => {setVisible(false)}}
            />
            <CardGroup id='TarjetasClientes'>
                {datosClientes.map((datClientes, index) => {
                    return index % 3 === 0 ? (
                        <Row key={index}>
                        {[0, 1, 2].map((offset) => {
                            const cartaIndex = index + offset;
                            const carta = datosClientes[cartaIndex];
                            if (!carta) {
                            return null;
                            }
                            return (
                            <Col key={cartaIndex}>
                              <CartaCliente
                                onLeer={function() {
                                  leerClientes();
                                }}
                                url={url}
                                urlImg={urlImg}
                                urlServImg={urlServImg}
                                DNI={carta.DNI}
                                nombre={carta.Nombre}
                                apellido={carta.Apellido}
                                contraseña={carta.Contrasena}
                                tipoUsu={carta.TipoUsu}
                                avatar={carta.Avatar}
                                plaza={carta.Plazas}
                                setMAlerta={setMAlerta}
                                setMostrar={setMostrar}
                              />
                            </Col>
                            );
                        })}
                        </Row>
                    ) : null;
                })}
            </CardGroup>
        </div>
        );
    }
}

export default ModClientes