import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//telas
import Home from './pages/home';
import Movimentacoes from './pages/movimentacoes';
import Cadastro from './pages/cadastro';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/home" element={<Home />} />

        <Route path="/movimentacoes" element={<Movimentacoes />} />

        <Route path="/cadastro" element={<Cadastro />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;