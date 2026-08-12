function Home() {
    return (
      <div className="bg-[#100E14] h-screen w-screen flex items-center justify-end pr-[10%]">
        
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-semibold text-white text-center">
            Loguiss
          </h1>
        </div>
  
        <nav
          className="
            w-[240px]
            h-screen
            flex
            flex-col
            fixed
            top-0
            left-0
            bg-[#F0F4FF]
            shadow-[0_4px_6px_rgba(0,0,0,0.1)]
            z-[1000]
          "
        >
          {/* Logo */}
          <div className="mt-[10px] p-5 text-center">
            <div className="flex items-center justify-center gap-[10px]">
              
              <img
                src="./images/logo.png"
                alt="Loguiss"
                className="w-[70px] h-[100px] rounded-lg"
              />
  
              <div className="flex flex-col items-start leading-[1.2]">
                <span className="text-[1.5rem] font-bold text-[#0B1D5A] m-0">
                  Loguiss
                </span>
  
                <div className="text-[0.9rem] text-[#4A4A4A] ml-[-10%]">
                  Gestão De Estoque
                </div>
              </div>
  
            </div>
          </div>
  
          {/* Separador */}
          <hr className="border-0 border-t border-[#ccc] my-2" />
  
          {/* Menu */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-2 px-4">
  
            <a
              href="/home"
              className="
                flex items-center gap-2
                py-3 px-4
                text-[#1C1C1C]
                no-underline
                rounded-lg
                transition-all duration-200
                bg-[#DDE5FF]
                font-bold
                hover:bg-[#DDE5FF]
              "
            >
              <i className="fas fa-chart-line text-[1.1rem]" />
              <span>Dashboard</span>
            </a>
  
            <a
              href="/produtos"
              className="
                flex items-center gap-2
                py-3 px-4
                text-[#1C1C1C]
                no-underline
                rounded-lg
                transition-all duration-200
                hover:bg-[#DDE5FF]
                hover:font-bold
              "
            >
              <i className="fas fa-box-open text-[1.1rem]" />
              <span>Produtos</span>
            </a>
  
  
            <a
              href="/movimentacoes"
              className="
                flex items-center gap-2
                py-3 px-4
                text-[#1C1C1C]
                no-underline
                rounded-lg
                transition-all duration-200
                hover:bg-[#DDE5FF]
                hover:font-bold
              "
            >
              <i className="fas fa-exchange-alt text-[1.1rem]" />
              <span>Movimentações</span>
            </a>
  
            <a
              href="/previsao-ia"
              className="
                flex items-center gap-2
                py-3 px-4
                text-[#1C1C1C]
                no-underline
                rounded-lg
                transition-all duration-200
                hover:bg-[#DDE5FF]
                hover:font-bold
              "
            >
              <i className="fas fa-robot text-[1.1rem]" />
              <span>Previsão IA</span>
            </a>
  
            <a
              href="/usuarios"
              className="
                flex items-center gap-2
                py-3 px-4
                text-[#1C1C1C]
                no-underline
                rounded-lg
                transition-all duration-200
                hover:bg-[#DDE5FF]
                hover:font-bold
              "
            >
              <i className="fas fa-users text-[1.1rem]" />
              <span>Usuários</span>
            </a>
  
          </div>
        </nav>
  
      </div>
    );
  }
  
  export default Home;