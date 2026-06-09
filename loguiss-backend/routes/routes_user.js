import express from 'express';
import controller from '../controllers/controller_user.js';
import forgot_password from '../middlewares/forgot_password_middleware.js'

const router_user = express.Router();

router_user.post('/login', (req, res) => {
    controller.Login(req, res);
});

router_user.post('/cod_verify', (req,res) => {
    controller.cod_verify(req,res);
})
router_user.post('/verify_cod', (req, res)=> {
    controller.verify_cod(req, res)
})
router_user.patch('/recuperar_senha', forgot_password, (req, res)=>{
    controller.recuperar_senha(req ,res)
} )

export default router_user;