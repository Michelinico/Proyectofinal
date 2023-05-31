import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const contenedor=document.querySelector("#contenedorModal");

const ModalesClientes = ({titulo, visible, cerrar, setMostrar, url, setMAlerta, onLeer, urlImg, registro, DNIm}) => {

  const [avatarSelec, setAvatarSelec] = useState({});

  const nombreAvatar = (event) => {
    setAvatarSelec(event.target.files[0]);
  };

  const enviarAvatar = async () => {
    const path = './Avatares/';

    const datosImg = new FormData();
    datosImg.append('image', avatarSelec);
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

    function enviarUsuario(formDataU) {
      const cabecera = {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},             
        body: JSON.stringify({ accion:'añadircliente', datosform: formDataU})
      };

      fetch(url, cabecera)
      .then(response => response.json())
      .then(datos => {
        setFormDataU(datos)
        setMAlerta('exitoC')
        setMostrar(true)
        onLeer();
      });
    }

    const [formDataU, setFormDataU] = useState({
      DNI:'',
      Nombre:'',
      Apellido:'',
      Contrasena:'',
      REContrasena:'',
      TipoUsu:'Cliente',
      Avatar:''
    });

    function modUsuario(formDataUM) {
      const cabecera = {
        method:'POST',
        headers: { 'Content-Type': 'application/json'},             
        body: JSON.stringify({ accion:'modificarcliente', datosform: formDataUM})
      };

      fetch(url, cabecera)
      .then(response => response.json())
      .then(datos => {
        setFormDataUM(datos)
        setMAlerta('exitoCM')
        setMostrar(true)
        onLeer();
      });
    }

    const [formDataUM, setFormDataUM] = useState({
      DNI:DNIm,
      Contrasena:'',
      REContrasena:'',
      Avatar:''
    });
  
  if (titulo==="MODIFICAR CLIENTE"){
    return(
        visible && 
        ReactDOM.createPortal(
            <Modal show={visible} onHide={cerrar}>
            <Modal.Header>
              <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formContrasena">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Introduce la contraseña"
                    name="Contrasena" 
                    value={formDataUM.Contrasena}
                    onChange={(e) =>
                      setFormDataUM({ ...formDataUM, Contrasena: e.target.value })
                    }/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formREContrasena">
                    <Form.Label>Vuelva a escribir la contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Introduce la contraseña"
                    name="REContrasena" 
                    value={formDataUM.REContrasena}
                    onChange={(e) =>
                      setFormDataUM({ ...formDataUM, REContrasena: e.target.value })
                    }/>
                  </Form.Group>
                
                  {formDataUM.Contrasena === formDataUM.REContrasena ? null : (
                    <>
                      <Alert key="danger" variant="danger">Las contraseñas no coinciden</Alert>
                    </>
                  )}

                  <Form.Group className="mb-3" controlId="formAvatar">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" accept="image/*"
                    name="Avatar" 
                    onChange={(event) => {
                      setFormDataUM({ ...formDataUM, Avatar: event.target.files[0].name })
                      nombreAvatar(event)
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
                  if ( formDataUM.Contrasena==='' && formDataUM.Avatar===''){
                    setMAlerta('falloCM')
                    setMostrar(true)
                  }else if( formDataUM.Contrasena!=='' && formDataUM.Avatar===''){
                    modUsuario(formDataUM)
                  }else {
                    modUsuario(formDataUM)
                    enviarAvatar()
                  }
                  setFormDataUM({ ...formDataUM, Contrasena: '', REContrasena: '', Avatar: ''})
                cerrar()}}>Enviar</Button>
            </Modal.Footer>
          </Modal>, contenedor)
    );
  }

  if (titulo==="Añadir cliente" || titulo==="Registro"){
    return(
        visible && 
        ReactDOM.createPortal(
            <Modal show={visible} onHide={cerrar}>
            <Modal.Header>
              <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form encType="multipart/form-data">
                <Form.Group className="mb-3" controlId="formDNI">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control type="text" placeholder="Introduce el DNI"
                  name="DNI" 
                  value={formDataU.DNI}
                  onChange={(e) =>
                    setFormDataU({ ...formDataU, DNI: e.target.value })
                  }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Introduce el nombre"
                  name="Nombre" 
                  value={formDataU.Nombre}
                  onChange={(e) =>
                    setFormDataU({ ...formDataU, Nombre: e.target.value })
                  }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formApellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" placeholder="Introduce el apellido"
                  name="Apellido" 
                  value={formDataU.Apellido}
                  onChange={(e) =>
                    setFormDataU({ ...formDataU, Apellido: e.target.value })
                  }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContrasena">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Introduce la contraseña"
                  name="Contrasena" 
                  value={formDataU.Contrasena}
                  onChange={(e) =>
                    setFormDataU({ ...formDataU, Contrasena: e.target.value })
                  }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formREContrasena">
                  <Form.Label>Vuelva a escribir la contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Introduce la contraseña"
                  name="REContrasena" 
                  value={formDataU.REContrasena}
                  onChange={(e) =>
                    setFormDataU({ ...formDataU, REContrasena: e.target.value })
                  }/>
                </Form.Group>
                
                {formDataU.Contrasena === formDataU.REContrasena ? null : (
                  <>
                    <Alert key="danger" variant="danger">Las contraseñas no coinciden</Alert>
                  </>
                )}               

                <Form.Group className="mb-3" controlId="formAvatar">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control type="file" accept="image/*"
                  name="Avatar" 
                  onChange={(event) => {
                    setFormDataU({ ...formDataU, Avatar: event.target.files[0].name })
                    nombreAvatar(event)
                  }}>
                  </Form.Control>
                </Form.Group>

                {registro === true ? null : (
                <Form.Group className="mb-3" controlId="formTipoUsu">
                <Form.Label>Tipo usuario</Form.Label>
                <Form.Select
                name="TipoUsu" 
                value={formDataU.TipoUsu}
                onChange={(e) =>
                  setFormDataU({ ...formDataU, TipoUsu: e.target.selectedOptions[0].value })
                }>
                  <option value='Cliente'>Cliente</option>
                  <option value='Administrador'>Administrador</option>
                </Form.Select>
                </Form.Group>
                )}             
              </Form>
                
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cerrar}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit"
                onClick={() =>
                  {
                    if (formDataU.Contrasena !== formDataU.REContrasena ){
                    alert("Las contraseñas no son iguales")
                    } else {
                      if (formDataU.DNI==='' || formDataU.Nombre==='' || formDataU.Apellido==='' || formDataU.Contrasena==='' || formDataU.Avatar===''){
                        setMAlerta('falloC')
                        setMostrar(true)
                      }else{
                        enviarUsuario(formDataU)
                        enviarAvatar()
                      }
                      cerrar()
                      setFormDataU({ ...formDataU, DNI: '', Nombre: '', Apellido: '', Contrasena: '', REContrasena: '', TipoUsu: 'Cliente', Avatar: ''})
                    }
                  }
                }>Enviar</Button>
            </Modal.Footer>
          </Modal>, contenedor)
    );
  }

}

export default ModalesClientes;