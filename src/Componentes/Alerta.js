import Alert from 'react-bootstrap/Alert';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';

const contenedor=document.querySelector("#contenedorAlerta");

const Alerta = ({show,cerrar, MAlerta}) => {

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

  if (MAlerta==="falloV"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="danger" className="full-width-alert">
            No se ha podido agregar el vehículo.
        </Alert>
      </Modal>, contenedor)
    );
  }

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

  if (MAlerta==="falloC"){
    return (
      show && cerrar &&
      ReactDOM.createPortal(
      <Modal variant="primary" backdrop show={show} onHide={cerrar}>
        <Alert variant="danger" className="full-width-alert">
            No se ha podido agregar el usuario.
            Compruebe si ha rellenado todos los datos.
        </Alert>
      </Modal>, contenedor)
    );
  }

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