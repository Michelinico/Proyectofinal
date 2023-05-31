import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect} from "react";

import ModalesVehiculos from './ModalesVehiculos';
import CartaVehiculo from './CartaVehiculo';
import Alerta from './Alerta';
import Menu from './Navbar';

function ModVehiculos({url,urlImg,urlServImg}) {

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

    const [datosCoches, setCoches] = useState([]);

    const [MAlerta, setMAlerta] = useState([]);

    const [mostrar, setMostrar] = useState(false);

    function leerCoches() {
      const cabecera = {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},             
        body: JSON.stringify({ accion:'leercochesjson'})
      };
    
      fetch(url, cabecera)
        .then(response => response.json())
        .then(datos => {
          setCoches(datos);
        });
    };

    useEffect(() => {
      if (url) {
      const cabecera = {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},             
        body: JSON.stringify({ accion:'leercochesjson'})
      };
    
      fetch(url, cabecera)
        .then(response => response.json())
        .then(datos => {
          setCoches(datos);
        });
      }
    }, [url]);

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
      <div className='Clientes'>
        <Menu tipo={tipo} url={url}/>
        <Alerta show={mostrar} 
              cerrar={() => {setMostrar(false)}}
              MAlerta={MAlerta}/>
          <h3>VEHICULOS</h3>
          <Button onClick={abrirCuadro} variant="primary">Añadir vehiculo</Button>
          <ModalesVehiculos
              onLeer={function() {
                leerCoches();
              }} 
              url={url}
              urlImg={urlImg}
              titulo="Añadir vehiculo"
              visible={visible}
              setMAlerta={setMAlerta}
              setMostrar={setMostrar}
              cerrar={() => {setVisible(false)}}
          />        
          <CardGroup id='TarjetasVehiculos'>
            {datosCoches.map((datCoches, index) => {
              return index % 3 === 0 ? (
                <Row key={index}>
                  {[0, 1, 2].map((offset) => {
                    const cartaIndex = index + offset;
                    const carta = datosCoches[cartaIndex];
                    if (!carta) {
                      return null;
                    }
                    return (
                      <Col key={cartaIndex}>
                        <CartaVehiculo
                          onLeer={function() {
                            leerCoches();
                          }}
                          url={url}
                          urlImg={urlImg}
                          urlServImg={urlServImg}
                          matricula={carta.Matricula}
                          propietario={carta.DNI}
                          marca={carta.Marca}
                          modelo={carta.Modelo}
                          color={carta.Color}
                          plaza={carta.Plaza}
                          imagen={carta.Imagen}
                          estados={estados}
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

export default ModVehiculos;