import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../services/api_user.js'
import { use } from 'react';

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

    // const codDigitado = inputRefs.join("")
    const codigoArray = inputRefs.current // aqui vai "tranformar" o array do html para um convencional que de para usar de boa
    .map(input => input?.value || "")
    .join("");


    async function formularioEnviado(e) {
        e.preventDefault();

        console.log(localStorage.getItem("token"))

        try{
            const resposta = await api.post('/verify_cod', {
                token_email: localStorage.getItem("token"),
                user_cod_verify: codigoArray
            })

            localStorage.setItem("token", resposta.data.token)
            console.log(resposta.data.token)


        }catch(error){
            console.log(error)
        }



        setEnviarFormulario(true);

        if (validarCodigo(codigo)) {
            return;
        }

        navigate('/redefinir-senha'); //navega para a tela de redefinir senha se o código for válido
    }

    const mostrarErro = enviar_formulario;

    return (

        <div className="bg-[url('./images/bg-login.png')] bg-cover bg-center h-screen w-screen flex items-center justify-end pr-[10%]">

            <div className="flex flex-col gap-5">

                <img src="./images/logo.png" alt="Logo do Loguiss" className="w-12 h-12 mx-auto mb-1"/>

                <h1 className="text-3xl font-semibold text-white text-center">Informar código</h1>

                <form onSubmit={ formularioEnviado } className="bg-white p-10 rounded-sm w-[400px] shadow-lg">
                    
                    <p className="text-center text-gray-600 mb-5">
                        Informe o código de verificação enviado para o seu email para redefinir sua senha.
                    </p>

                    <div className="flex justify-center gap-3 bg-gray rounded-sm  p-3 border border-gray-200 mb-4">

                        <input
                            type="text"
                            maxLength="1"
                            className="w-10 h-10 text-center text-sm font-bold border border-gray-300 rounded-sm"
                            onChange={(e) => atualizarCodigo(e, 0)}
                            ref={(el) => (inputRefs.current[0] = el)}
                            autoComplete="off"
                        />

                        <input
                            type="text"
                            maxLength="1"
                            className="w-10 h-10 text-center text-sm font-bold border border-gray-300 rounded-sm"
                            onChange={(e) => atualizarCodigo(e, 1)}
                            ref={(el) => (inputRefs.current[1] = el)}
                            autoComplete="off"
                        />

                        <input
                            type="text"
                            maxLength="1"
                            className="w-10 h-10 text-center text-sm font-bold border border-gray-300 rounded-sm"
                            onChange={(e) => atualizarCodigo(e, 2)}
                            ref={(el) => (inputRefs.current[2] = el)}
                            autoComplete="off"
                        />

                        <input
                            type="text"
                            maxLength="1"
                            className="w-10 h-10 text-center text-sm font-bold border border-gray-300 rounded-sm"
                            onChange={(e) => atualizarCodigo(e, 3)}
                            ref={(el) => (inputRefs.current[3] = el)}
                            autoComplete="off"
                        />

                        <input
                            type="text"
                            maxLength="1"
                            className="w-10 h-10 text-center text-sm font-bold border border-gray-300 rounded-sm"
                            onChange={(e) => atualizarCodigo(e, 4)}
                            ref={(el) => (inputRefs.current[4] = el)}
                            autoComplete="off"
                        />

                        <input
                            type="text"
                            maxLength="1"
                            className="w-10 h-10 text-center text-sm font-bold border border-gray-300 rounded-sm"
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

                </form>

            </div>

        </div>
    )
}

export default CodigoVerificacao;