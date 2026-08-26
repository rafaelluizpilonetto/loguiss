import express from 'express';
import cors from 'cors';
import router_login from './routes/routes_login.js';
import router_categoria from './routes/routes_categoria.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", router_login)
app.use("/categoria", router_categoria)

app.listen(3000);