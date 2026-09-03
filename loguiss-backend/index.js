import express from 'express';
import cors from 'cors';
import router_login from './routes/routes_login.js';
import router_categoria from './routes/routes_categoria.js';
import router_receita from './routes/routes_receita.js';
import router_produto from './routes/routes_produto.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", router_login)
app.use("/categoria", router_categoria)
app.use("/receita", router_receita)
app.use("/produto", router_produto)

app.listen(3000);