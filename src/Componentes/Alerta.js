import Alert from 'react-bootstrap/Alert';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';

const contenedor=document.querySelector("#contenedorAlerta");

const Alerta = ({show,cerrar, MAlerta}) => {

  // Alerta de éxito en agregar el vehículo
  if (MAlerta==="exitoV"){
  return (
    show && cerrar &&
    ReactDOM.createPortal(
    <Modal variant="primary" backdrop show={show} onHide={cerrar}>
      <Alert variant="primary" className="full-width-alert">
          El vehículo se ha introducido en el sistema.
      </Alert>
    </Modal>, contenedor)
  );
  }

  // Alerta de fallo en agregar el vehículo
  if (MAlerta==="falloV"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="danger" className="full-width-alert">
            No se ha podido agregar el vehículo.
            Compruebe si han rellenado todos los datos.
        </Alert>
      </Modal>, contenedor)
    );
  }

  // Alerta de confirmacón de modificación de vehículo
  if (MAlerta==="exitoVM"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="primary" className="full-width-alert">
            El vehículo se ha modificado el vehiculo.
        </Alert>
      </Modal>, contenedor)
    );
    }
  
  // Alerta de fallo al modificar el vehículo
  if (MAlerta==="falloVM"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="danger" className="full-width-alert">
          No se ha podido modificar el vehiculo.
        </Alert>
      </Modal>, contenedor)
    );
  }

  // Alerta para el fallo en el registro por no tener las contraseñas iguales
  if (MAlerta==="NoPass"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="danger" className="full-width-alert">
          Las contraseñas no son iguales.
        </Alert>
      </Modal>, contenedor)
    );
  }

  // Alerta para confirmar el registro
  if (MAlerta==="RegOK"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="primary" className="full-width-alert">
          Se ha realizado el registro con éxito.
        </Alert>
      </Modal>, contenedor)
    );
  }

  // Alerta para confirmar que el cliente se ha agregado
  if (MAlerta==="exitoC"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="primary" className="full-width-alert">
            El usuario se ha introducido en el sistema.
        </Alert>
      </Modal>, contenedor)
    );
  }

  // Alerta del registro para añadir cliente desde admin
  if (MAlerta==="falloC"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="danger" className="full-width-alert">
            No se ha podido agregar el usuario.
            Compruebe si han rellenado todos los datos.
        </Alert>
      </Modal>, contenedor)
    );
  }

  // Alerta para confirmar la modificación
  if (MAlerta==="exitoCM"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="primary" className="full-width-alert">
            El usuario se ha modificado.
        </Alert>
      </Modal>, contenedor)
    );
  }

  // Alerta de que no se ha podido modificar el cliente
  if (MAlerta==="falloCM"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="danger" className="full-width-alert">
            No se ha podido modificar el usuario.
        </Alert>
      </Modal>, contenedor)
    );
  }

  // Alerta de confirmación de borrado de cliente
  if (MAlerta==="exitoBC"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="primary" className="full-width-alert">
            El usuario se ha borrado con éxito.
        </Alert>
      </Modal>, contenedor)
    );
  }

  // Alerta de fallo al borrar cliente
  if (MAlerta==="falloBC"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="danger" className="full-width-alert">
            No se ha podido borrar el usuario.
        </Alert>
      </Modal>, contenedor)
    );
  }

  // Alerta de confirmación de borrado del vehículo
  if (MAlerta==="exitoBV"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal backdrop show={show} onHide={cerrar}>
        <Alert variant="primary" className="full-width-alert">
            El vehiculo se ha borrado con éxito.
        </Alert>
      </Modal>, contenedor)
    );
  }

  // Alerta de fallo al borrar vehículo
  if (MAlerta==="falloBV"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="danger" className="full-width-alert">
            No se ha podido borrar el vehiculo.
        </Alert>
      </Modal>, contenedor)
    );
  }

  // Alerta de cierre de sesión
  if (MAlerta==="Cerrar"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="primary" className="full-width-alert">
            Se ha cerrado la sesión.
        </Alert>
      </Modal>, contenedor)
    );
  }

}

export default Alerta;