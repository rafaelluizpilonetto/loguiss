import { prisma } from '../database.js';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";


const chave_jwt = process.env.CHAVE_JWT // pega a chave dos JWTs da .env
const senha_app = process.env.SENHA_APP


async function Login (req,res) {
    const {email , senha} = req.body

    if(!email || !senha){
        return res.status(400).json({MGS: "informa certo"})
    }

    try{
        const usuario_achado = await prisma.user.findFirst({
            where:{
                email:email,
                senha:senha
            }
        })
        if(!usuario_achado){
            return res.status(401).json({MSG: "Email ou senha inválidos"})
        }

        const usuario_email = usuario_achado.email
        const usuario_id = usuario_achado.id_user

        const token = jwt.sign({
            id: usuario_id,
            email: usuario_email
        },
            chave_jwt,
        {
            expiresIn: "1h"
        });

        return res.status(200).json({MSG: "Senha e email corretos!!", token: token})

    }catch(error){
        console.error(error);
        return res.status(500).json({error: 'Erro interno do servidor'});
    }

        
}

async function cod_verify(req,res) {
    const {email} = req.body


    const email_existente = await prisma.user.findUnique({  // tenta achar um email igual no servidor
        where:{
            email: email
        }
    })
    if(!email_existente){
        return res.status(404).json({MSG: "Email não existe!! faça o cadastro"})
    }
    

    const codigo_verify = String(Math.floor(100000 + Math.random() * 90000))

    const expira_em = new Date();// pega a hora atual junto com a data

    expira_em.setMinutes(expira_em.getMinutes() + 15) // aqui  vai pegar a hora atual e adicionar mais 15 minutos

    await prisma.user.update({
        where:{
            id_user: email_existente.id_user
        },
        data:{
            cod_verify: codigo_verify,
            expira_em: expira_em

        }

    })
    console.log(email_existente.email)

    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "christian.darosa0106@gmail.com",
        pass: senha_app
    }
    });
    
    const token = jwt.sign({ // cria um token jwt para ser usado na hora de recuperar senha
                            // isso só vai servir para ter uma maior segurança 
        id: email_existente.id_user,
        email: email_existente.email,
    },
        chave_jwt,
    {
        expiresIn: "10m"
    });


    try{
        const mailOptions = {
            from: process.env.EMAIL_APP,
            to: email_existente.email,
            subject: "Código de verificação",
            html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
        <div style="
            max-width: 500px;
            margin: auto;
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
        ">
            
            <h1 style="color: #2e7d32; margin-bottom: 10px;">
            Verificação de Conta
            </h1>

            <p style="color: #555; font-size: 16px;">
            Recebemos uma solicitação para confirmar sua identidade.
            </p>

            <p style="color: #555; font-size: 16px;">
            Utilize o código abaixo:
            </p>

            <div style="
            background: #e8f5e9;
            color: #2e7d32;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            ">
            ${codigo_verify}
            </div>

            <p style="color: #777; font-size: 14px;">
            Este código expira em 10 minutos.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">

            <p style="color: #999; font-size: 12px;">
            Se você não solicitou este código, ignore este e-mail.
            </p>

        </div>
        </div>`
        };
        const resposta = await transporter.sendMail(mailOptions);

        console.log(resposta)
    }catch (erro) {
    console.error(erro);
}

    return res.status(201).json({MSG: "Token criado e email enviado", token: token})
        
}

async function verify_cod(req,res) {
    const {token_email, user_cod_verify} = req.body // pega o email e o código(que o user digitou) vindo do front

    const token_decodificado = jwt.verify(token_email, chave_jwt)

    console.log(user_cod_verify)
    const email_existente = await prisma.user.findFirst({ //primeiro procura para ver se bate com algum usuário do banco
        where:{
            email:token_decodificado.email,
            cod_verify: user_cod_verify
        }
    })
    console.log(email_existente)
    if(!email_existente){ // se não bater com nenhum, o token é inválido
        return res.status(404).json({MSG:"token inválido, por favor insira novamente"})
    }

    const tempo = new Date() //pega a date e hora de agora
    
    if( tempo > email_existente.expira_em){ // verifica se a hora de agora é maior do que a hora que o token vai expirar
                                            // se for, entra aqui e acaba
        return res.status(406).json({MSG: "Código de verificação expirou, favor gerar novo código!"})
    }

    const token = jwt.sign({ // cria um token jwt para ser usado na hora de recuperar senha
                            // isso só vai servir para ter uma maior segurança 
        id: email_existente.id_user,
        email: email_existente.email,
        codigo_verify: email_existente.cod_verify
    },
        chave_jwt,
    {
        expiresIn: "10m"
    });

    return res.status(200).json({ // aqui retorna o token jwt para o front usar 
        MSG: "Token válido, recuperação de senha permitida!!",
        token: token})

}
async function recuperar_senha(req, res){
    try{
        const usuario = req.user
        const {senha_user, confirm_senha_user} = req.body 
        
        if(!senha_user || !confirm_senha_user){
            return res.status(400).json({MSG: "Informe a senha nos campos!!"})
        }

        if(senha_user != confirm_senha_user){
            return res.status(403).json({MSG: "senhas não correspondem, favor informar novamente!!"})
        }

        await prisma.user.update({
            where:{
                id_user: usuario.id
            },
            data:{
                senha: senha_user
            }
        })
        return res.status(200).json({MSG: "senha alterada"})
        
    }catch(error){
        console.log(error)
    }
    
}

async function cadastro_user(req, res) {
    const {email, senha, cpf, telefone, nome} = req.body
}


export default {Login, cod_verify, verify_cod, recuperar_senha}