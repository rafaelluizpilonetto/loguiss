import { prisma } from '../../database.js';

export async function delete_categoria(req, res) {
    const {id_categoria} = req.body;
    if(!id_categoria){
        return res.status(400).json({MSG:""})
    }
    
}