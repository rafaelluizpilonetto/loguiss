import { useRef, useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api_user.js'

function EsqueceuSenha() {

    const [email, setEmail] = useState(''); 

    const [email_tocado, setEmailTocado] = useState(false);

    const email_formato_valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); //verificar se o email tem um formato válido

    const [enviar_formulario, setEnviarFormulario] = useState(false);

    const [loading, setLoading] = useState(false); //para o "loading" na hora de enviar o email

    const navigate = useNavigate();

    function validarEmail(email) {

        if(email.trim() === ""){
            return "O email é obrigatório";
        } //se o email estiver vazio, exibe mensagem de erro

        if(!email_formato_valido){
            return "Formato de email inválido";
        } // se o email não tiver um formato válido, exibe mensagem de erro

        return "";
    }

    const email_ref = useRef()


    async function formularioEnviado(e) {
        e.preventDefault();


        try{
            setLoading(true); // ativa o "loading"
            const resposta = await api.post('/cod_verify', {
                email: email_ref.current.value
            });
            localStorage.setItem("token", resposta.data.token)
        

        }catch(error){
            console.log(error)
        }

        setEnviarFormulario(true);
        setEmailTocado(true);

        if (validarEmail(email)) {
            return;
        }

        navigate('/codigo-verificacao');
    }

    const mostrarErro = email_tocado || enviar_formulario;


    return (

        <div className="bg-[url('./images/bg-login.png')] bg-cover bg-center h-screen w-screen flex items-center justify-end pr-[10%]">

            <div className="flex flex-col gap-5">

                <img src="./images/logo.png" alt="Logo do Loguiss" className="w-12 h-12 mx-auto mb-1"/>

                <h1 className="text-3xl font-semibold text-white text-center">Redefinir senha</h1>

                <form onSubmit={ formularioEnviado } className="bg-white p-10 rounded-sm w-[400px] shadow-lg">
                    
                    <p className="text-center text-gray-600 mb-5">
                        Insira seu email cadastrado para receber as instruções de redefinição de senha.
                    </p>

                    <div className="flex items-center gap-3 bg-gray rounded-sm  p-3 border border-gray-200 mb-4">

                        <User size={20} />

                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full outline-none bg-transparent"
                            onChange={(e) => setEmail(e.target.value)} //atualiza o estado do email quando o usuário digitar
                            onBlur={() => setEmailTocado(true)} //atualiza o estado de email_tocado para true quando o campo de email perder o foco
                            value={email}
                            ref={email_ref}
                        />

                    </div>

                    {mostrarErro && validarEmail(email) && (
                        <p className="text-red-500 text-sm mb-3">
                            {validarEmail(email)}
                        </p>
                    )}

                    <button 
                        type="submit"
                        className="w-full p-3 cursor-pointer mt-5 bg-[#4EDB4E] border-none rounded-sm text-white font-bold hover:bg-[#3CB43C] transition-colors duration-300"
                        onClick={()=> formularioEnviado}
                        disabled={loading} //  é um if simplificado, que muda enquanto o back não responde
                    >
                    {loading ? "Enviando..." : "Enviar código"} 
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
    )
}

export default EsqueceuSenha;