import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const contenedor=document.querySelector("#contenedorConsulta");

const Consultas = ( {titulo, visible, datos, cerrar, url, usuario, tamano, estados,urlServImg}) => {
    
  if (titulo==="Comprobar matrícula"){
    return(
        visible && 
        ReactDOM.createPortal(
            <Modal show={visible} onHide={cerrar} size={tamano}>
            <Modal.Header>
              <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div key='0' id="ConsulMat">
                <h3 style={{textAlign: "center"}}>{datos.Matricula}</h3>
                {estados.map((estado) => {
                  if (estado.Matricula === datos.Matricula) {
                    if (estado.Estado === "Dentro") {
                      return (
                        <>
                          <div>
                            <img style={{float: "left", objectFit:"scale-down", paddingRight: "15px"}} alt="" width="300px" height="175px" src={urlServImg + `/ImagenesCoches/CochesClientes/${datos.Imagen}`} />
                            <div>
                              <p style={{margin: "20px", textAlign:"justify"}}>Propietario: {datos.DNI}</p>
                              <p style={{margin: "20px", textAlign:"justify"}}>Marca: {datos.Marca}</p>
                              <p style={{margin: "20px", textAlign:"justify"}}>Modelo: {datos.Modelo}</p>
                              <p style={{margin: "20px", textAlign:"justify"}}>Color: {datos.Color}</p>
                              <p style={{ textAlign: "justify" }}>Estado del vehiculo: Dentro - Fecha de entrada: {estado.UltimaEntrada}</p>
                            </div>
                          </div>
                          <h5>A pagar por este vehiculo: {estado.Pagar}€</h5>
                        </>
                      )
                    } else {
                      return (
                        <>
                          <div>
                            <img style={{float: "left", objectFit:"scale-down", paddingRight: "15px"}} alt="" width="300px" height="175px" src={urlServImg + `/ImagenesCoches/CochesClientes/${datos.Imagen}`} />
                            <div>
                              <p style={{margin: "20px", textAlign:"justify"}}>Propietario: {datos.DNI}</p>
                              <p style={{margin: "20px", textAlign:"justify"}}>Marca: {datos.Marca}</p>
                              <p style={{margin: "20px", textAlign:"justify"}}>Modelo: {datos.Modelo}</p>
                              <p style={{margin: "20px", textAlign:"justify"}}>Color: {datos.Color}</p>
                              <p style={{ textAlign: "justify" }}>Estado del vehiculo: Fuera - Fecha de salida: {estado.UltimaSalida}</p>
                            </div>
                          </div>
                          <h5>A pagar por este vehiculo: {estado.Pagar}€</h5>
                        </>
                      )
                    }
                  } else {
                    return null;
                  }
                })}
                {/*Esta parte del código comprueba si no hay ningún elemento en el array "estados" que tenga la misma matrícula que el vehículo "datos"*/}
                {!estados.some((estado) => estado.Matricula === datos.Matricula) &&
                  <>
                    <div>
                      <img style={{float: "left", objectFit:"scale-down", paddingRight: "15px"}} alt="" width="300px" height="175px" src={process.env.PUBLIC_URL + `/ImagenesCoches/CochesClientes/${datos.Imagen}`} />
                      <div>
                        <p style={{margin: "20px", textAlign:"justify"}}>Propietario: {datos.DNI}</p>
                        <p style={{margin: "20px", textAlign:"justify"}}>Marca: {datos.Marca}</p>
                        <p style={{margin: "20px", textAlign:"justify"}}>Modelo: {datos.Modelo}</p>
                        <p style={{margin: "20px", textAlign:"justify"}}>Color: {datos.Color}</p>
                        <p style={{ textAlign: "justify" }}>Estado del vehiculo: Fuera</p>
                      </div>
                    </div>
                    <h5>No se ha efectuado ninguna entrada al parking</h5>
                  </>
                }
              </div>            
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cerrar}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>, contenedor)
    );
  }
  if (titulo === "Comprobar vehiculos asociados a DNI") {
    return (
      visible &&
      ReactDOM.createPortal(
        <Modal show={visible} onHide={cerrar} size={tamano}>
          <Modal.Header>
            <Modal.Title>{titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Vehiculos asociados a {usuario}</h5>
            {datos.filter((coche) => coche.DNI === usuario).map((coche, index) => {
              // Buscamos el estado del vehículo en el array 'estados'
              const estadoVehiculo = estados.find((estado) => estado.Matricula === coche.Matricula);
              let estadoTexto = "No ha efectuado ninguna entrada";
              if (estadoVehiculo) {
                estadoTexto = estadoVehiculo.Estado === "Dentro" ? 
                  `Estado del vehiculo: Dentro - Fecha de entrada: ${estadoVehiculo.UltimaEntrada}` : 
                  `Estado del vehiculo: Fuera - Fecha de salida: ${estadoVehiculo.UltimaSalida}`;
              }
              const aPagar = estadoVehiculo ? estadoVehiculo.Pagar : 0;
              return (
                <div key={index} id="ConsulDNI">
                  <img style={{float: "left", objectFit:"scale-down", padding_right: "15px"}} alt="" width="300px" height="175px" src={process.env.PUBLIC_URL + `/ImagenesCoches/CochesClientes/${coche.Imagen}`}></img>
                  <div>
                    <p style={{textAlign: "justify" }}>Matricula: {coche.Matricula}</p>
                    <p style={{ textAlign: "justify" }}>Marca: {coche.Marca}</p>
                    <p style={{ textAlign: "justify" }}>Modelo: {coche.Modelo}</p>
                    <p style={{ textAlign: "justify" }}>Color: {coche.Color}</p>
                    <p style={{ textAlign: "justify" }}>{estadoTexto}</p>
                  </div>
                  <div className="Vacio"></div>
                  <h5>A pagar por este vehiculo: {aPagar}€</h5>
                </div>
              )
            })}
          </Modal.Body>
          <Modal.Footer>
          <h5>Total a pagar: {estados.filter((estado) => datos.find((coche) => coche.Matricula === estado.Matricula && coche.DNI === usuario)).reduce((total, estado) => total + parseFloat(estado.Pagar), 0).toFixed(2)}€</h5>
            <Button variant="secondary" onClick={cerrar}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>,
        contenedor
      )
    )
  }

}

export default Consultas;