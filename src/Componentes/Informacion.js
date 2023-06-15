import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Informacion() {
    return(
    <Container className='Informacion'>
        <Row>
            <Col>
                <h5>CONTACTO</h5>
                <ul>
                    <li>Correo: xxxxxxxxxx@xxxxxxxx.com</li>
                    <li>Teléfono: +34 XXX XXX XXX</li>
                    <li>Horario de atencion:</li>
                    <li className='SinPunto'>Lunes-Domingo</li>
                    <li className='SinPunto'>8:00-22:00</li>
                    <li>Dirección:</li>
                    <li className='SinPunto'>C. Cv Encina, 12</li>
                    <li className='SinPunto'>18015 Granada</li>
                </ul>
            </Col>
            <Col>
                <h5>SOBRE NOSOTROS</h5> 
                <p>En nuestro parking privado, ofrecemos servicios de estacionamiento seguros y convenientes. Con instalaciones modernas y seguras, ubicación con fácil acceso y atención al cliente excepcional, nos esforzamos por proporcionar una experiencia placentera.</p>
                <p>Además, nos comprometemos con prácticas sostenibles para proteger el medio ambiente. ¡Esperamos recibirte en nuestro parking privado!</p>
            </Col>
            <Col>
                <h5>LOCALÍZANOS</h5>
                <div className="mapa">
                    <iframe title="Mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d794.5965982940068!2d-3.6204981304468764!3d37.19105086661564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fcf85764e9ed%3A0x51a6b0eb6388cf1a!2sC.%20Cv%20Encina%2C%2012%2C%2018015%20Granada!5e0!3m2!1ses!2ses!4v1681991715873!5m2!1ses!2ses" loading="lazy" align="middle"></iframe>
                </div>
            </Col>
        </Row>
    </Container>
    )
}
