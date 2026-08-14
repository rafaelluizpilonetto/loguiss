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

         <div className="bg-[#050212] h-screen w-screen flex items-center justify-center ">

            <div className="flex flex-col gap-5">

                <svg
                    className="absolute top-0 left-0 w-[320px] h-[250px] pointer-events-none"
                    viewBox="0 0 320 250"
                    fill="none"
                >
                    <path
                    d="M0 0H180C130 60 90 120 0 160V0Z"
                    fill="#4EDB4E"
                    />
                </svg>

                <svg
                    className="absolute bottom-0 right-0 w-[450px] h-[320px] pointer-events-none"
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
                            Insira seu email cadastrado para receber as instruções de redefinição de senha.
                        </p>

                        <div className="flex items-center gap-3 bg-gray rounded-sm  p-3 border border-gray-200 mb-4">

                            <User size={20} />

                            <input
                                type="text"
                                placeholder="Email"
                                className="w-full outline-none bg-transparent text-white"
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
                            onClick={() => formularioEnviado()}
                        >
                        Verificar email e enviar código
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

export default EsqueceuSenha;



