import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModalesClientes from './ModalesClientes';

import { useState} from "react";

function CartaCliente({DNI,nombre,apellido,avatar,plaza,url,onLeer,setMAlerta,setMostrar,urlImg,urlServImg}) {

    function borrarCliente(DNI) {
        const cabecera = {
          method:'POST',
          headers: { 'Content-Type': 'application/json'},             
          body: JSON.stringify({ accion:'borrarcliente', idcliente: DNI})
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
            alert(texto)
            onLeer();
        });
    };

    const abrirCuadro= () => {
        setVisible(true);
      }

    const [visible, setVisible] = useState(false);

    return (
        <Card className='Carta'>
            <Card.Title>{DNI}</Card.Title>
            <Card.Img variant="top" src={urlServImg + `/Avatares/${avatar}`} />
            <Card.Body>
                <Card.Text>
                    <li>Nombre: {nombre}</li>
                    <li>Apellido: {apellido}</li>
                    <li>Plazas: {plaza}</li>
                </Card.Text>
                <Button onClick={abrirCuadro} variant="primary">Modificar</Button>
                <ModalesClientes
                    onLeer={onLeer}
                    url={url} 
                    urlImg={urlImg}
                    titulo="MODIFICAR CLIENTE"
                    DNIm={DNI}
                    setMAlerta={setMAlerta}
                    setMostrar={setMostrar}
                    visible={visible}
                    cerrar={() => {setVisible(false)}}
                />
                <Button id={DNI} variant="primary"
                        onClick={() => borrarCliente(DNI)
                        }
                >Borrar</Button>
            </Card.Body>
        </Card>
    );
}
    
export default CartaCliente
