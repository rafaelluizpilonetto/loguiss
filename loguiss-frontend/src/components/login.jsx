import { useState } from 'react';
import { User, Lock, Eye, EyeClosed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState(''); 

    const [email_tocado, setEmailTocado] = useState(false);
    const [senha_tocada, setSenhaTocada] = useState(false);

    const email_formato_valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); //verificar se o email tem um formato válido

    const [enviar_formulario, setEnviarFormulario] = useState(false);

    const [visualizar_senha, setVisualizarSenha] = useState(false);

    const navigate = useNavigate(); //hook do react-router-dom para navegação programática

    function validarEmail() {
        if(!email_tocado && !enviar_formulario){
            return "";
        } //se o email não foi tocado e o formulário não foi enviado, não exibe erros

        if(email.trim() === ""){
            return "O email é obrigatório";
        } //se o email estiver vazio, exibe mensagem de erro

        if (!email_formato_valido) {
            return 'Formato de email inválido';
        } // se o email não tiver um formato válido, exibe mensagem de erro

        return "";
    }

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

    function formularioEnviado(e) {
        e.preventDefault();

        setEnviarFormulario(true);

        setEmailTocado(true);
        setSenhaTocada(true);

        if (
            email.trim() === "" ||
            !email_formato_valido ||
            senha.trim() === "" ||
            senha.length < 6
        ) {
            return;
        }
    }

    const erro_email = validarEmail();
    const erro_senha = validarSenha();

    return (

        <div className="bg-[url('./images/bg-login.png')] bg-cover bg-center h-screen w-screen flex items-center justify-end pr-[10%]">

            <div className="flex flex-col gap-5">
            
                <img src="./images/logo.png" alt="Logo do Loguiss" className="w-12 h-12 mx-auto mb-1"/>

                <h1 className="text-3xl font-semibold text-white text-center">Loguiss</h1>

                <form onSubmit={formularioEnviado} className="bg-white p-10 rounded-sm w-[400px] shadow-lg">

                    <div className="flex items-center gap-3 bg-gray rounded-sm  p-3 border border-gray-200 mb-4">

                        <User size={20} />

                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full outline-none bg-transparent"
                            onChange={(e) => setEmail(e.target.value)} //atualiza o estado do email quando o usuário digitar
                            onBlur={() => setEmailTocado(true)} //atualiza o estado de email_tocado para true quando o campo de email perder o foco
                            value={email}
                        />

                    </div>

                    {erro_email && (
                        <p className="text-red-500 text-sm mb-3">
                            {erro_email}
                        </p>
                    )}

                    <div className="flex items-center gap-3 bg-gray p-3 rounded-sm border border-gray-200 mb-1">

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

                    <button
                        type="button"
                        onClick={() => navigate('/esqueceu-senha')} 
                        className="block text-xs text-blue-500 hover:underline"
                    >
                    Esqueci minha senha
                    </button>


                    <button 
                        type="submit"
                        className="w-full p-3 cursor-pointer mt-5 bg-[#4EDB4E] border-none rounded-sm text-white font-bold hover:bg-[#3CB43C] transition-colors duration-300"
                    >
                    Entrar
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Login;