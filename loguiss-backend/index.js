import express from 'express';
import cors from 'cors';
import router_user from './routes/routes_user.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", router_user)

app.listen(3000);