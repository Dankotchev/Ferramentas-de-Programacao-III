import express from 'express';
import path from "path";
import { AppDataSource } from "./data-source";
import routes from './routes';

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT as number, () =>
      console.log(`Listening on all interfaces:${PORT}`)
    );
  })
  .catch((error) => console.log(error));
