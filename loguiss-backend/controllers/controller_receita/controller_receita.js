import { create_receita_service } from "../../services/receita_service/create_receita.service.js";


export async function create_receita(req, res) {
    await create_receita_service(req,res);
    
}

export default {create_receita}