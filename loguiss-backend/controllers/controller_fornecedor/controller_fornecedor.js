import create_fornecedor_service from "../../services/fornecedor_service/create_fornecedor.service.js";


async function create_fornecedor(req, res) {
    await create_fornecedor_service(req, res);   
}

export default {create_fornecedor}