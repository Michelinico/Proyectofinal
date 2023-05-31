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
            let texto;
            if (datos.exito) {
                texto="El mensaje se ha eliminado con éxito";
            }else{
                texto="El mensaje no ha podido ser eliminado";
            }
            onLeer();
            alert(texto)           
        });
    };

    const abrirCuadro= () => {
        setVisible(true);
        onLeer();
      }

    const [visible, setVisible] = useState(false);

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
                <Button id={matricula} variant="primary" show={false}
                        onClick={() => borrarCoche(matricula)
                        }
                >Borrar</Button>
            </Card.Body>
        </Card>
    );
}
    
export default CartaVehiculo
