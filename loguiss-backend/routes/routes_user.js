import express from 'express';
import controller from '../controllers/controller_user.js';

const router_user = express.Router();

router_user.post('/login', (req, res) => {
    controller.Login(req, res);
});

export default router_user;