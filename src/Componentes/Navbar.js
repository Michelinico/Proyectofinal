import { Outlet, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Menu({usuario, tipo, pagar, url, setMAlerta, setMostrar}) {

  function cerrarSesion() {
    const cabecera = {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},             
      body: JSON.stringify({ accion:'cerrarsesion'}),
      credentials: 'include'
    };
  
    fetch(url, cabecera)
      .then(response => response.json())
      .then(datos => {
        setMAlerta('Cerrar')
        setMostrar(true)
      });
  };
  
  if (tipo==="Cliente"){
    return (
      <>
      <Navbar className="menus" expand="lg">
        <Container >
          <Navbar.Brand >
            <img
            src={process.env.PUBLIC_URL + `/favicon.ico`}
            className="d-inline-block logo"
            alt="Logo"
            />   
          </Navbar.Brand>

          <Navbar.Text className="text-center mx-auto">
            Hola<b> {usuario}</b>
          </Navbar.Text>

          <Navbar.Text className="text-center mx-auto">
            Total a pagar: <b> {pagar}€</b>
          </Navbar.Text>

          <Link className="d-flex text-link" to={process.env.PUBLIC_URL + `/`} onClick={cerrarSesion}>Cerrar sesión</Link>
        </Container>
      </Navbar>
      <Outlet />
      </>
    );
  }else if (tipo==="Administrador"){
    return (
      <>
      <Navbar expand="lg" className="menus">
        <Container >
          <Navbar.Brand >
              <img
              src={process.env.PUBLIC_URL + `/favicon.ico`}
              className="d-inline-block logo"
              alt="Logo"
              />   
          </Navbar.Brand>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
              <Link to={process.env.PUBLIC_URL + `/MenuAdm`} className='text-link'>Consultas</Link>
              <Link to={process.env.PUBLIC_URL + `/MenuAdm/ModClientes`} className='text-link'>Clientes</Link>
              <Link to={process.env.PUBLIC_URL + `/MenuAdm/ModVehiculos`} className='text-link'>Vehículos</Link>
          </Nav>

            <Link className="d-flex text-link" to={process.env.PUBLIC_URL + `/`} onClick={cerrarSesion}>Cerrar sesión</Link>
        </Container>
      </Navbar>
      <Outlet />
      </>
    );
  }
}