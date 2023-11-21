import express from 'express';
import * as dotenv from "dotenv";

import routes from './routes';

var cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 3333;

const app = express();
app.use(cors());  // Configuração CORS. Aceita todas requisições, indenpendente da origem
app.use(express.json());
app.use(routes);

app.listen(PORT as number,  () => console.log(`Listening on all interfaces:${PORT}`));
