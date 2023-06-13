import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModalesVehiculos from './ModalesVehiculos';

import { useState } from "react";

function CartaVehiculo({matricula, propietario, marca, modelo, color, plaza, imagen, url, urlImg, urlServImg, onLeer, estados, setMAlerta, setMostrar}) {

    function borrarCoche(matricula) {
        const cabecera = {
          method:'POST',
          headers: { 'Content-Type': 'application/json'},             
          body: JSON.stringify({ accion:'borrarvehiculo', idcoche: matricula})
        };
    
        fetch(url, cabecera)
        .then(response => response.json())
        .then(datos => {
            if (datos) {
                setMAlerta('exitoBV')
                setMostrar(true)
            }else{
                setMAlerta('falloBV')
                setMostrar(true)
            }
            onLeer();          
        });
    };

    const abrirCuadro= () => {
        setVisible(true);
        onLeer();
      }

    const [visible, setVisible] = useState(false);

    const abrirPregunta= () => {
        setVisibleP(true);
      }

    const [visibleP, setVisibleP] = useState(false);

    return (
        <Card className='Carta'>
            <Card.Title>{matricula}</Card.Title>
            <Card.Img variant="top" src={urlServImg + `/ImagenesCoches/CochesClientes/${imagen}`} />
            <Card.Body>
                <Card.Text>
                    <li>Propietario: {propietario}</li>
                    <li>Marca: {marca}</li>
                    <li>Modelo: {modelo}</li>
                    <li>Color: {color}</li>
                    <li>Plaza: {plaza}</li>
                    <li>Estado: {estados.find(estado => estado.Matricula === matricula)?.Estado || 'Fuera'}</li>
                </Card.Text>
                <Button onClick={abrirCuadro} variant="primary">Modificar</Button>
                <ModalesVehiculos
                    onLeer={onLeer}
                    url={url} 
                    urlImg={urlImg}
                    colorV={color}
                    plazaV={plaza}
                    matricula={matricula}
                    titulo="Modificar vehiculo"
                    setMAlerta={setMAlerta}
                    setMostrar={setMostrar}
                    visible={visible}
                    cerrar={() => {setVisible(false)}}
                />
                <Button id={matricula} variant="primary" onClick={abrirPregunta}>Borrar</Button>
                <ModalesVehiculos
                    titulo="BORRAR VEHICULO"
                    visible={visibleP}
                    cerrar={() => {setVisibleP(false)}}
                    borrar={() => {borrarCoche(matricula)}}
                />
            </Card.Body>
        </Card>
    );
}
    
export default CartaVehiculo
