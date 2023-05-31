import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Inicio from './Componentes/Inicio';
import ModClientes from './Componentes/ModClientes';
import ModVehiculos from './Componentes/ModVehiculos';
import MenuAdmin from './Componentes/MenuAdmin';
import MenuUsu from './Componentes/MenuUsu';

function App() {

  const [url, setUrl] = useState(null);
  const [urlImg, setUrlImg] = useState(null);
  const [urlServImg, setUrlServImg] = useState(null);

  useEffect(() => {

    fetch(process.env.PUBLIC_URL+"/conexion.json")
    .then(response => response.json())
    .then(datos => {
      setUrl(datos.url);
      setUrlImg(datos.urlImg);
      setUrlServImg(datos.urlServImg);
    }, [url]);

  })

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path={process.env.PUBLIC_URL + `/`} element={ url !== "" && <Inicio url={url} urlImg={urlImg}/>}/>
          <Route path={process.env.PUBLIC_URL + `/MenuAdm/ModClientes`} element={ url !== "" && <ModClientes url={url} urlImg={urlImg} urlServImg={urlServImg}/>} />
          <Route path={process.env.PUBLIC_URL + `/MenuAdm/ModVehiculos`} element={ url !== "" && <ModVehiculos url={url} urlImg={urlImg} urlServImg={urlServImg}/>} />
          <Route path={process.env.PUBLIC_URL + `/MenuAdm`} element={ url !== "" && <MenuAdmin url={url} urlServImg={urlServImg}/>} />
          <Route path={process.env.PUBLIC_URL + `/InicioUsuario`} element={ url !== "" && <MenuUsu url={url} urlServImg={urlServImg}/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;