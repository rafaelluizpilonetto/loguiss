import { create_categoria } from '../../services/categoria_service/create_categoria.service.js'
import { delete_categoria } from '../../services/categoria_service/delete_categoria.service.js';
import { edit_categoria } from '../../services/categoria_service/edit_categoria.service.js';


async function criar_categoria(req, res) {
    await create_categoria(req, res);

    // return res.status(200).json({MSG: "Categoria criada com sucesso criado com sucesso!!"});
}
async function editar_categoria(req, res) {
    await edit_categoria(req, res)
    
}

async function apagar_categoria(req, res) {
    await delete_categoria(req, res)
}

export default { criar_categoria, editar_categoria, apagar_categoria}

