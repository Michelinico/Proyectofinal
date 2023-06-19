import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModalesClientes from './ModalesClientes';

import { useState} from "react";

function CartaCliente({DNI,nombre,apellido,telefono,avatar,plaza,url,onLeer,setMAlerta,setMostrar,urlImg,urlServImg}) {

    function borrarCliente(DNI) {
        const cabecera = {
          method:'POST',
          headers: { 'Content-Type': 'application/json'},             
          body: JSON.stringify({ accion:'borrarcliente', idcliente: DNI})
        };
    
        fetch(url, cabecera)
        .then(response => response.json())
        .then(datos => {
            if (datos) {
                setMAlerta('exitoBC')
                setMostrar(true)
            }else{
                setMAlerta('falloBC')
                setMostrar(true)
            }
            onLeer();
        });
    };

    const abrirCuadro= () => {
        setVisible(true);
      }
    const [visible, setVisible] = useState(false);

    const abrirPregunta= () => {
        setVisibleP(true);
      }
    const [visibleP, setVisibleP] = useState(false);

    // Código para dibujar las cartas de los clientes junto con sus modales
    return (
        <Card className='Carta'>
            <Card.Title>{DNI}</Card.Title>
            <Card.Img variant="top" src={urlServImg + `/Avatares/${avatar}`} />
            <Card.Body>
                <Card.Text>
                    <li>Nombre: {nombre}</li>
                    <li>Apellido: {apellido}</li>
                    <li>Telefono: {telefono}</li>
                    <li>Plazas: {plaza}</li>
                </Card.Text>
                <Button onClick={abrirCuadro} variant="primary">Modificar</Button>
                <ModalesClientes
                    onLeer={onLeer}
                    url={url} 
                    urlImg={urlImg}
                    titulo="MODIFICAR CLIENTE"
                    telefonoV={telefono}
                    DNIm={DNI}
                    setMAlerta={setMAlerta}
                    setMostrar={setMostrar}
                    visible={visible}
                    cerrar={() => {setVisible(false)}}
                />
                <Button id={DNI} variant="primary" onClick={abrirPregunta}>Borrar</Button>
                <ModalesClientes
                    titulo="BORRAR CLIENTE"
                    visible={visibleP}
                    url={url}
                    setMAlerta={setMAlerta}
                    setMostrar={setMostrar}
                    cerrar={() => {setVisibleP(false)}}
                    borrar={() => {borrarCliente(DNI)}}
                />
            </Card.Body>
        </Card>
    );
}
    
export default CartaCliente
