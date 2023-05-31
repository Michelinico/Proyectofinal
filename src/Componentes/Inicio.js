import Login from './Login.js';
import Informacion from './Informacion.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Inicio({url,urlImg}) {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState('');
    const [tipo, setTipo] = useState('');
    const [nombre, setNombre] = useState('');

    function identificar(usuario) {    
        setUsuario(usuario);
    }

    function Tipo(tipo) {    
        setTipo(tipo);
    }

    function Nombre(nombre) {    
        setNombre(nombre);
    }

    useEffect(() => {
        if (tipo === 'Cliente') {
          navigate(process.env.PUBLIC_URL + `/InicioUsuario`);
        } else if (tipo === 'Administrador') {
          navigate(process.env.PUBLIC_URL + `/MenuAdm`);
        }
      }, [tipo, usuario, nombre, navigate]);

    if (url!== "" && tipo===""){
        return (
            <>
            <Login 
                url={url}
                urlImg={urlImg}
                onIdentificar={function(usuario) {
                    identificar(usuario);
                }}
                onTipo={function(tipo) {
                    Tipo(tipo);
                }}
                onNombre={function(nombre) {
                    Nombre(nombre);
                }}
            />
            <Informacion/>
            </>
        );
    }else {
        return null;
    }
}