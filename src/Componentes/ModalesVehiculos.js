import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

const contenedor=document.querySelector("#contenedorModal");

const ModalesVehiculos = ({titulo, visible, cerrar,borrar, setMostrar, url, setMAlerta, colorV, plazaV, matricula, onLeer, urlImg, historialD}) => {
  const [imagenSelec, setImagenSelec] = useState({});

  const nombreImagen = (event) => {
    setImagenSelec(event.target.files[0]);
  };

  const enviarImagen = async () => {
    const path = './CochesClientes/';

    const datosImg = new FormData();
    datosImg.append('image', imagenSelec);
    datosImg.append('path', path);

    try {
      const response = await fetch(urlImg, {
        method: 'POST',
        body: datosImg,
      });

      // Handle the response from PHP if needed
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  
  const [propietarios, setPropietarios] = useState([]);
    
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
        setPropietarios(datos);
      });
    }
    }, [url]);

    function enviarVehiculo(formDataC) {
      const cabecera = {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},             
        body: JSON.stringify({ accion:'añadirvehiculo', datosform: formDataC})
      };

      fetch(url, cabecera)
      .then(response => response.json())
      .then(datos => {
        setFormDataC(datos)
        setMAlerta('exitoV')
        setMostrar(true)
        onLeer()
      });
    };

    const [formDataC, setFormDataC] = useState({
      Matricula:'',
      DNI:'',
      Marca:'',
      Modelo:'',
      Color:'',
      Plaza:'',
      Imagen:''
    });

    function modVehiculo(formDataCM) {
      const cabecera = {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},             
        body: JSON.stringify({ accion:'modificarvehiculo', datosform: formDataCM})
      };

      fetch(url, cabecera)
      .then(response => response.json())
      .then(datos => {
        setFormDataCM(datos)
        setMAlerta('exitoVM')
        setMostrar(true)
        onLeer()
      });
    };

    const [formDataCM, setFormDataCM] = useState({
      Matricula:matricula,
      Color:colorV,
      Plaza:plazaV,
      Imagen:''
    });

    // COMPROBAR PLAZAS LIBRES //
    const [plazas, setPlazas] = useState([]);
    const [plazasDisponibles, setPlazasDisponibles] = useState([]);
    
    useEffect(() => {
      if (url) {
        const cabecera = {
          method:'POST',
          headers: { 'Content-Type': 'application/json'},             
          body: JSON.stringify({ accion:'plazasdisponibles'})
        };
    
        fetch(url, cabecera)
        .then(response => response.json())
        .then(datos => {
          setPlazas(datos);
        });
      }
    }, [url]);
    
    useEffect(() => {
      const plazasGuardadas = plazas.map(plaza => parseInt(plaza)); // convertimos las plazas a números
      const Disponibles = Array.from({ length: 100 }, (_, index) => index + 1).filter(plaza => !plazasGuardadas.includes(plaza));
      setPlazasDisponibles(Disponibles);
    }, [plazas]);
    
  if (titulo==="Modificar vehiculo"){
    return(
        visible && 
        ReactDOM.createPortal(
            <Modal show={visible} onHide={cerrar}>
            <Modal.Header>
              <Modal.Title className="CentrarTitulo">{titulo} {matricula}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formColor">
                    <Form.Label>Color</Form.Label>
                    <Form.Control type="text" placeholder="Introduce el color"
                    name="Color" 
                    value={formDataCM.Color}
                    onChange={(e) =>
                      setFormDataCM({ ...formDataCM, Color: e.target.value })
                    }/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPlaza">
                    <Form.Label>Plaza</Form.Label>
                    <Form.Select
                    name="Plaza"
                    value={formDataCM.Plaza}
                    onChange={(e) =>
                      setFormDataCM({ ...formDataCM, Plaza: e.target.selectedOptions[0].value })
                    }>
                      <option key={plazaV} value={plazaV}>{plazaV}</option>
                      {plazasDisponibles.map((plaza) => (
                      <option key={plaza} value={plaza}>{plaza}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formImagen">
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control type="file" accept="image/*"
                  name="Imagen"
                  onChange={(event) => {
                    setFormDataCM({ ...formDataCM, Imagen: event.target.files[0].name })
                    nombreImagen(event)
                  }}>
                  </Form.Control>
                </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cerrar}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit"
                onClick={() =>
                  {
                  if ( formDataCM.Imagen==='' ){
                    modVehiculo(formDataCM)
                  }else if ( formDataCM.Color==='' ){
                    setMAlerta('falloVM')
                    setMostrar(true)
                  }else{
                    modVehiculo(formDataCM)
                    enviarImagen()
                  }
                  setFormDataCM({ ...formDataCM, Color: colorV, Plaza: plazaV, Imagen: ''})
                cerrar()}}>Enviar</Button>
            </Modal.Footer>
          </Modal>, contenedor)
    );
  }
  if (titulo==="Añadir vehiculo"){
    return(
        visible && 
        ReactDOM.createPortal(
            <Modal show={visible} onHide={cerrar}>
            <Modal.Header>
              <Modal.Title className="CentrarTitulo">{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form encType="multipart/form-data">
                <Form.Group className="mb-3" controlId="formMatricula">
                  <Form.Label>Matricula</Form.Label>
                  <Form.Control type="text" placeholder="Introduce la matricula"
                  name="Matricula" 
                  value={formDataC.Matricula}
                  onChange={(e) =>
                    setFormDataC({ ...formDataC, Matricula: e.target.value })
                  }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDNI">
                  <Form.Label>Propietario</Form.Label>
                  <Form.Select
                  name="DNI"
                  value={formDataC.DNI}
                  onChange={(e) =>
                    setFormDataC({ ...formDataC, DNI: e.target.selectedOptions[0].value })
                  }>
                    <option>Selecciona un propietario</option>
                    {propietarios.map((propietario) => (
                    <option key={propietario.DNI} value={propietario.DNI}>{propietario.DNI}-{propietario.Nombre}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMarca">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control type="text" placeholder="Introduce la marca"
                  name="Marca" 
                  value={formDataC.Marca}
                  onChange={(e) =>
                    setFormDataC({ ...formDataC, Marca: e.target.value })
                  }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formModelo">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control type="text" placeholder="Introduce el modelo de tu coche"
                  name="Modelo"
                  value={formDataC.Modelo}
                  onChange={(e) =>
                    setFormDataC({ ...formDataC, Modelo: e.target.value })
                  }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control type="text" placeholder="Introduce el color"
                  name="Color" 
                  value={formDataC.Color}
                  onChange={(e) =>
                    setFormDataC({ ...formDataC, Color: e.target.value })
                  }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPlaza">
                  <Form.Label>Plaza</Form.Label>
                  <Form.Select
                  name="Plaza"
                  value={formDataC.Plaza}
                  onChange={(e) =>
                    setFormDataC({ ...formDataC, Plaza: e.target.selectedOptions[0].value })
                  }>
                    <option>Selecciona una plaza</option>
                    {plazasDisponibles.map((plaza) => (
                    <option key={plaza} value={plaza}>{plaza}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formImagen">
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control type="file" accept="image/*"
                  name="Imagen"
                  onChange={(event) => {
                    setFormDataC({ ...formDataC, Imagen: event.target.files[0].name })
                    nombreImagen(event)
                  }}>
                  </Form.Control>
                </Form.Group>

              </Form>
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() =>
                {
                cerrar()
                setFormDataC({ ...formDataC, Matricula: '', DNI: '', Marca: '', Modelo: '', Color: '', Plaza: '', Imagen: ''})
                }}>
                Cancelar
            </Button>
            <Button variant="primary" type="submit"
              onClick={() =>
                {
                  if ( formDataC.Matricula==='' || formDataC.DNI==='' || formDataC.Marca==='' || formDataC.Modelo==='' || formDataC.Color==='' || formDataC.Plaza==='' || formDataC.Imagen===''){
                    setMAlerta('falloV')
                    setMostrar(true)
                  }else{
                    enviarVehiculo(formDataC)
                    enviarImagen()
                  }
                setFormDataC({ ...formDataC, Matricula: '', DNI: '', Marca: '', Modelo: '', Color: '', Plaza: '', Imagen: '' })
              cerrar()}}>Enviar</Button>
            </Modal.Footer>
          </Modal>, contenedor)
    );
  }

  if (titulo==="BORRAR VEHICULO"){
    return(
        visible && 
        ReactDOM.createPortal(
            <Modal show={visible} onHide={cerrar}>
            <Modal.Header>
              <Modal.Title className="CentrarTitulo">{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>¿Estás seguro de que lo quieres borrar?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cerrar}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit"
                onClick={() => {
                  cerrar()
                  borrar()
                }}>Si</Button>
            </Modal.Footer>
          </Modal>, contenedor)
    );
  }

  if (titulo==="Historial"){
    return(
        visible && 
        ReactDOM.createPortal(
            <Modal show={visible} onHide={cerrar}>
            <Modal.Header>
              <Modal.Title className="CentrarTitulo">{titulo} de {matricula}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {historialD.length === 0 ? (
                <p>No se han efectuado entradas.</p>
              ) : (
                <Table className="TablaES" bordered striped>
                  <thead>
                    <tr>
                      <th>Entrada</th>
                      <th>Salida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historialD.map((historial,index) => (
                      <tr key={index}>
                        <td>{historial.Entrada}</td>
                        <td>{historial.Salida}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cerrar}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>, contenedor)
    );
  }

}

export default ModalesVehiculos;
