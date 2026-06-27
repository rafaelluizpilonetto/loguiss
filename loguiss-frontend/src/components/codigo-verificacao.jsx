import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 

function CodigoVerificacao() {

    const navigate = useNavigate();

    const [codigo, setCodigo] = useState(['', '', '', '', '', '']); //estado para armazenar os valores dos 6 inputs do código de verificação

    const [enviar_formulario, setEnviarFormulario] = useState(false);

    const inputRefs = useRef([]); // Array para armazenar as referências dos inputs

    function atualizarCodigo(e, index) {

        const valor = e.target.value;

        const novoCodigo = [...codigo];
        novoCodigo[index] = valor;

        setCodigo(novoCodigo);

        if (valor && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    } //função para atualizar o estado do código de verificação e mover o foco para o próximo input automaticamente

    function validarCodigo(codigo) {

        const codigoCompleto = codigo.join('');

        if (codigoCompleto.length !== 6) {
            return "Informe os 6 dígitos do código de verificação";
        }

        return "";
    } //função para validar o código de verificação, verificando se os 6 dígitos foram preenchidos

    function formularioEnviado(e) {
        e.preventDefault();

        setEnviarFormulario(true);

        if (validarCodigo(codigo)) {
            return;
        }

        navigate('/redefinir-senha'); //navega para a tela de redefinir senha se o código for válido
    }

    const mostrarErro = enviar_formulario;

    return (

        <div className="bg-[#050212] h-screen w-screen flex items-center justify-center ">

            <div className="flex flex-col gap-5">

                <svg
                    class="absolute top-0 left-0 w-[320px] h-[250px] pointer-events-none"
                    viewBox="0 0 320 250"
                    fill="none"
                >
                    <path
                    d="M0 0H180C130 60 90 120 0 160V0Z"
                    fill="#4EDB4E"
                    />
                </svg>

                <svg
                    class="absolute bottom-0 right-0 w-[450px] h-[320px] pointer-events-none"
                    viewBox="0 0 450 320"
                    fill="none"
                >
                    <path
                    d="M450 320H0C180 280 320 220 390 100C410 60 425 20 450 0V320Z"
                    fill="#4EDB4E"
                    />
                </svg>

                <div className="flex w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl">

                    <aside className="hidden lg:flex w-1/2 bg-[#0D0B12] items-center justify-center">

                        <img src="./images/imagem-estoque.png" alt="Imagem de estoque" className="w-full h-full"/>

                    </aside>

                    <form onSubmit={ formularioEnviado } className="bg-[#100E14] p-10 rounded-sm w-[400px] shadow-lg">

                        <img src="./images/logo.png" alt="Logo da Loguiss" className="w-20 h-20 mx-auto mb-4 rounded-xl"/>
                        
                        <p className="text-center text-green-500 mb-5">
                            Informe o código de verificação enviado para o seu email para redefinir sua senha.
                        </p>

                        <div className="flex justify-center gap-3 bg-gray rounded-sm  p-3 border border-gray-500 mb-4">

                            <input
                                type="text"
                                maxLength="1"
                                className="w-10 h-10 text-center text-green-500 text-sm font-bold border border-gray-300 rounded-sm"
                                onChange={(e) => atualizarCodigo(e, 0)}
                                ref={(el) => (inputRefs.current[0] = el)}
                                autoComplete="off"
                            />

                            <input
                                type="text"
                                maxLength="1"
                                className="w-10 h-10 text-center text-green-500 text-sm font-bold border border-gray-300 rounded-sm"
                                onChange={(e) => atualizarCodigo(e, 1)}
                                ref={(el) => (inputRefs.current[1] = el)}
                                autoComplete="off"
                            />

                            <input
                                type="text"
                                maxLength="1"
                                className="w-10 h-10 text-center text-green-500 text-sm font-bold border border-gray-300 rounded-sm"
                                onChange={(e) => atualizarCodigo(e, 2)}
                                ref={(el) => (inputRefs.current[2] = el)}
                                autoComplete="off"
                            />

                            <input
                                type="text"
                                maxLength="1"
                                className="w-10 h-10 text-center text-green-500 text-sm font-bold border border-gray-300 rounded-sm"
                                onChange={(e) => atualizarCodigo(e, 3)}
                                ref={(el) => (inputRefs.current[3] = el)}
                                autoComplete="off"
                            />

                            <input
                                type="text"
                                maxLength="1"
                                className="w-10 h-10 text-center text-green-500 text-sm font-bold border border-gray-300 rounded-sm"
                                onChange={(e) => atualizarCodigo(e, 4)}
                                ref={(el) => (inputRefs.current[4] = el)}
                                autoComplete="off"
                            />

                            <input
                                type="text"
                                maxLength="1"
                                className="w-10 h-10 text-center text-green-500 text-sm font-bold border border-gray-300 rounded-sm"
                                onChange={(e) => atualizarCodigo(e, 5)}
                                ref={(el) => (inputRefs.current[5] = el)}
                                autoComplete="off"
                            />

                        </div>

                        {mostrarErro && validarCodigo(codigo) && (
                            <p className="text-red-500 text-sm mb-3">
                                {validarCodigo(codigo)}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full p-3 mt-5 bg-[#4EDB4E] text-white rounded-sm font-bold hover:bg-[#3CB43C]"
                        >
                            Confirmar código de verificação
                        </button>

                        <button 
                            type="button"
                            onClick={() => navigate('/login')} 
                            className="w-full p-3 cursor-pointer mt-5 bg-[#0B0819] border-none rounded-sm text-white font-bold hover:bg-[#170F3C] transition-colors duration-300"
                        >
                        Voltar para login
                        </button>

                    </form>
   
                </div>
            
            </div>

        </div>
    )
}

export default CodigoVerificacao;





