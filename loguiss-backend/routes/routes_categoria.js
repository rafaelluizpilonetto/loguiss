import express from 'express';
import controller from '../controllers/controller_categoria/controller_categoria.js'

const router_categoria = express.Router();

router_categoria.post('/create_categoria', (req, res)=> {
    controller.create_categoria(req, res);
})


export default router_categoria;