import { useState } from 'react';
import { Lock, Eye, EyeClosed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function RedefinirSenha() {

    const [senha, setSenha] = useState(''); 
    const [confirmar_senha, setConfirmarSenha] = useState('');

    const [senha_tocada, setSenhaTocada] = useState(false);
    const [confirmar_senha_tocada, setConfirmarSenhaTocada] = useState(false);

    const [enviar_formulario, setEnviarFormulario] = useState(false);

    const [visualizar_senha, setVisualizarSenha] = useState(false);
    const [visualizar_confirmar_senha, setVisualizarConfirmarSenha] = useState(false);

    const navigate = useNavigate(); //hook do react-router-dom para navegação programática

    function validarSenha() {
        if(!senha_tocada && !enviar_formulario){
            return "";
        } //se a senha não foi tocada e o formulário não foi enviado, não exibe erros

        if(senha.trim() === ""){
            return "A senha é obrigatória";
        } //se a senha estiver vazia, exibe mensagem de erro

        if(senha.length < 6){
            return "A senha deve conter no mínimo 6 caracteres";
        } //se a senha tiver menos de 6 caracteres, exibe mensagem de erro

        return "";
    }

    function validarConfirmarSenha() {
        if(!confirmar_senha_tocada && !enviar_formulario){
            return "";
        } //se a confirmação da senha não foi tocada e o formulário não foi enviado, não exibe erros

        if(confirmar_senha.trim() === ""){
            return "A confirmação da senha é obrigatória";
        } //se a confirmação da senha estiver vazia, exibe mensagem de erro

        if(confirmar_senha !== senha){
            return "As senhas não coincidem";
        } //se a confirmação da senha for diferente da senha, exibe mensagem de erro

        return "";
    }

    function formularioEnviado(e) {
        e.preventDefault();

        setEnviarFormulario(true);

        setSenhaTocada(true);
        setConfirmarSenhaTocada(true);

        if (
            senha.trim() === "" ||
            senha.length < 6 ||
            confirmar_senha.trim() === "" ||
            confirmar_senha !== senha
        ) {
            return;
        }

         navigate('/login'); //navega para a tela de login após redefinir a senha
    }

    const erro_senha = validarSenha();
    const erro_confirmar_senha = validarConfirmarSenha();

    return (

        <div className="bg-[url('./images/bg-login.png')] bg-cover bg-center h-screen w-screen flex items-center justify-end pr-[10%]">

            <div className="flex flex-col gap-5">
            
                <img src="./images/logo.png" alt="Logo do Loguiss" className="w-12 h-12 mx-auto mb-1"/>

                <h1 className="text-3xl font-semibold text-white text-center">Nova senha</h1>

                <form onSubmit={ formularioEnviado } className="bg-white p-10 rounded-sm w-[400px] shadow-lg">

                    <div className="flex items-center gap-3 bg-gray p-3 rounded-sm border border-gray-200 mb-5">

                        <Lock size={20} />

                        <input
                            type={visualizar_senha ? "text" : "password"} //se o olho estiver aberto, o tipo do input será "text" para mostrar a senha, caso contrário, será "password" para ocultar a senha
                            placeholder="Senha"
                            className="w-full outline-none bg-transparent"
                            onChange={(e) => setSenha(e.target.value)} //atualiza o estado da senha quando o usuário digitar
                            onBlur={() => setSenhaTocada(true)} //atualiza o estado de senha_tocada para true quando o campo de senha perder o foco
                            value={senha}
                        />

                       <button
                            type="button"
                            onClick={() => setVisualizarSenha(!visualizar_senha)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {visualizar_senha ? <EyeClosed size={20} /> : <Eye size={20} />}
                        </button>

                    </div>

                    {erro_senha && (
                        <p className="text-red-500 text-sm mb-3">
                            {erro_senha}
                        </p>
                    )}

                    <div className="flex items-center gap-3 bg-gray p-3 rounded-sm border border-gray-200 mb-1">

                        <Lock size={20} />

                        <input
                            type={visualizar_confirmar_senha ? "text" : "password"} //se o olho estiver aberto, o tipo do input será "text" para mostrar a senha, caso contrário, será "password" para ocultar a senha
                            placeholder="Confirmar senha"
                            className="w-full outline-none bg-transparent"
                            onChange={(e) => setConfirmarSenha(e.target.value)} //atualiza o estado da senha quando o usuário digitar
                            onBlur={() => setConfirmarSenhaTocada(true)} //atualiza o estado de senha_tocada para true quando o campo de senha perder o foco
                            value={confirmar_senha}
                        />

                       <button
                            type="button"
                            onClick={() => setVisualizarConfirmarSenha(!visualizar_confirmar_senha)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {visualizar_confirmar_senha ? <EyeClosed size={20} /> : <Eye size={20} />}
                        </button>

                    </div>

                    {erro_confirmar_senha && (
                        <p className="text-red-500 text-sm mb-3">
                            {erro_confirmar_senha}
                        </p>
                    )}

                    <button 
                        type="submit"
                        className="w-full p-3 cursor-pointer mt-5 bg-[#4EDB4E] border-none rounded-sm text-white font-bold hover:bg-[#3CB43C] transition-colors duration-300"
                    >
                    Redefinir senha
                    </button>

                </form>

            </div>

        </div>
    )
}

export default RedefinirSenha;