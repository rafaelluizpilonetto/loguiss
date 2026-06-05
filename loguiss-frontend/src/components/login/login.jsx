import './login.css';
import { User, Lock } from 'lucide-react';


function Login() {
    return (
        <div className="login-container">

            <div className="login-container-right">
                
                <h1 className="titles">Bem-vindo de volta!</h1>

                <div className="form-container">

                    <div className="gp-input">

                        <User size={20} />
                        <input type="text" placeholder="Email" required />

                    </div>

                    <div className="gp-input">

                        <Lock size={20} />
                        <input type="password" placeholder="Senha" required />

                    </div>

                    <a href="#" className="esqueceu-senha">Esqueceu sua senha?</a>

                    <button className="btn-login">Entrar</button>

                </div>

            </div>
            
        </div>
    )
}

export default Login;