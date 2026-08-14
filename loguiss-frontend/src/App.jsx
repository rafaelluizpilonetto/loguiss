import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//telas
import Login from './pages/login'
import EsqueceuSenha from './pages/esqueceu-senha';
import CodigoVerificacao from './pages/codigo-verificacao';
import RedefinirSenha from './pages/redefinir-senha';
import Termos from './pages/termos';
import Politicas from './pages/politicas';


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />

        <Route path="/codigo-verificacao" element={<CodigoVerificacao />} />

        <Route path="/redefinir-senha" element={<RedefinirSenha />} />

        <Route path="/termos" element={<Termos />} />

        <Route path="/politicas" element={<Politicas />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;