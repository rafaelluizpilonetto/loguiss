// import { prisma } from '../database.js';
import { create_produto } from '../../services/produto_service/create_produto.service.js'


export async function create_produto(req, res) {
    const produto = await create_produto(req, res);

    return res.status(200).json({MSG: "Produto criado com sucesso!!"})
}




// produto.controller.js

// import { criarProduto, buscarProduto } from "./produto.service.js";

// export async function criar(req, res) {
//   const produto = await criarProduto(req.body);

//   return res.status(201).json(produto);
// }

// export async function buscar(req, res) {
//   const produto = await buscarProduto(req.params.id);

//   return res.json(produto);
// }


