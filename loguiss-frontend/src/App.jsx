import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//telas
import Login from './components/login';
import EsqueceuSenha from './components/esqueceu-senha';
import CodigoVerificacao from './components/codigo-verificacao';
import RedefinirSenha from './components/redefinir-senha';


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
    
        <Route path="/codigo-verificacao" element={<CodigoVerificacao />} />

        <Route path="/redefinir-senha" element={<RedefinirSenha />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;