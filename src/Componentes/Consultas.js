import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const contenedor=document.querySelector("#contenedorConsulta");

const Consultas = ( {titulo, visible, datos, cerrar, usuario, tamano, estados,urlServImg}) => {
    
  // Código para realizar la comprobación de la consulta de matrícula
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
                            <img style={{float: "left", objectFit:"scale-down", paddingRight: "15px"}} alt="Vehiculo" width="300px" height="175px" src={urlServImg + `/CochesClientes/${datos.Imagen}`} />
                            <div>
                              <p><b>Propietario:</b> {datos.DNI}</p>
                              <p><b>Marca:</b> {datos.Marca}</p>
                              <p><b>Modelo:</b> {datos.Modelo}</p>
                              <p><b>Color:</b> {datos.Color}</p>
                              <p><b>Estado:</b> Dentro - Fecha de entrada: {estado.UltimaEntrada}</p>
                            </div>
                          </div>
                          <h5 className='pPrecio'>A pagar por este vehiculo: {estado.Pagar}€</h5>
                        </>
                      )
                    } else {
                      return (
                        <>
                          <div>
                            <img style={{float: "left", objectFit:"scale-down", paddingRight: "15px"}} alt="Vehiculo" width="300px" height="175px" src={urlServImg + `/CochesClientes/${datos.Imagen}`} />
                            <div>
                              <p><b>Propietario:</b> {datos.DNI}</p>
                              <p><b>Marca:</b> {datos.Marca}</p>
                              <p><b>Modelo:</b> {datos.Modelo}</p>
                              <p><b>Color:</b> {datos.Color}</p>
                              <p><b>Estado:</b> Fuera - Fecha de salida: {estado.UltimaSalida}</p>
                            </div>
                          </div>
                          <h5 className='pPrecio'>A pagar por este vehiculo: {estado.Pagar}€</h5>
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
                      <img style={{float: "left", objectFit:"scale-down", paddingRight: "15px"}} alt="Vehiculo" width="300px" height="175px" src={urlServImg + `/CochesClientes/${datos.Imagen}`} />
                      <div>
                        <p><b>Propietario:</b> {datos.DNI}</p>
                        <p><b>Marca:</b> {datos.Marca}</p>
                        <p><b>Modelo:</b> {datos.Modelo}</p>
                        <p><b>Color:</b> {datos.Color}</p>
                        <p><b>Estado:</b> Fuera</p>
                      </div>
                    </div>
                    <h5 className='pPrecio'>No se ha efectuado ninguna entrada al parking</h5>
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
                  `Dentro - Fecha de entrada: ${estadoVehiculo.UltimaEntrada}` : 
                  `Fuera - Fecha de salida: ${estadoVehiculo.UltimaSalida}`;
              }
              const aPagar = estadoVehiculo ? estadoVehiculo.Pagar : 0;
              return (
                <div key={index} id="ConsulDNI">
                  <img style={{float: "left", objectFit:"scale-down", paddingRight: "15px"}} alt="Vehiculo" width="300px" height="175px" src={urlServImg + `/CochesClientes/${coche.Imagen}`}></img>
                  <div>
                    <p><b>Matricula:</b> {coche.Matricula}</p>
                    <p><b>Marca:</b>  {coche.Marca}</p>
                    <p><b>Modelo:</b>  {coche.Modelo}</p>
                    <p><b>Color:</b>  {coche.Color}</p>
                    <p><b>Estado:</b>  {estadoTexto}</p>
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