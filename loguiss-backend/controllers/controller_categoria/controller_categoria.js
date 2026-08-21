import { create_categoria } from '../../services/categoria_service/create_categoria.service.js'


export async function create_categoria(req, res) {
    const produto = await create_categoria(req, res);

    // return res.status(200).json({MSG: "Categoria criada com sucesso criado com sucesso!!"});
}


