import { prisma } from '../../database.js';
import { link_receita_produto } from '../receita_produto_service/link_receita_produto.service.js'; 
import { link_categoria_produto } from '../categoria_produto_service/link_categoria_produto.service.js';


export async function create_produto_service(req, res) {
    let { descricao, 
        id_tipo_produto, 
        id_unidade_medida, 
        is_fracionado, 
        valor, 
        flag_ativo,
        id_categoria_user,
        id_receita } = req.body
    
    let campos_obrigatorios = [
        descricao, 
        id_tipo_produto, 
        id_unidade_medida, 
        valor,
        id_receita,
        id_categoria_user]

    if(campos_obrigatorios.some(campo => campo === "")){ // vai verificar se existe algum campo vazio na lista de obrigatórios
        return res.status(400).json({MSG: "Algum campo está faltando, por favor verifique!!"})
    }
    try {
        id_tipo_produto = Number(id_tipo_produto);
        id_unidade_medida = Number(id_unidade_medida);
        id_categoria_user = Number(id_categoria_user)
        
        const produto = await prisma.produto.create({
            data:{
                descricao: descricao,
                valor: valor,
                unidade_medida:{
                    connect:{
                        id_unidade: id_unidade_medida
                    }
                },
                tipo_produto:{
                    connect:{
                        id_tipo_produto: id_tipo_produto
                    }
                }
            }
        })
        const id_produto = produto.id_produto
        const id_categoria = id_categoria_user
        const object_link = await link_categoria_produto(id_categoria, id_produto);
        console.log(object_link)

        return res.status(200).json({MSG:"produto criado com sucesso!!", produto: produto})
    } catch (error) {
        console.log(error)
    }
}