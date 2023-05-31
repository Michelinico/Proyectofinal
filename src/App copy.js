import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Container } from 'react-bootstrap';
import { Login } from './Componentes/Login';

function App() {
  return (      
    <Container>
      <Login onIdentificar={identificar}/>
      { usuario && tipoUsu=='Usuario' &&
        <MenuUsu show={isVisible} usuario={usuario}/>
      }
      { usuario && tipoUsu=='Admin' &&
        <MenuAdmin show={isVisible} usuario={usuario}/>
      }

    </Container>
  );
}

export default App;