import { prisma } from '../database.js';
import jwt from 'jsonwebtoken';

async function Login (req,res) {
    const {email , senha} = req.body

    const usuario_achado = await prisma.user.findUnique({
        where:{
            email:email,
            senha:senha
        }
    })
        
}

export default {Login }