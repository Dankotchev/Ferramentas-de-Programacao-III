import express, { Request, Response } from "express";
import * as Yup from "yup";

const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());

app.post("/teste", async (requisicao: Request, resposta: Response) => {
  const regras = Yup.object().shape({
    nome: Yup.string().required("Informe o nome"), // Mensagem que aparece em caso de erro
    email: Yup.string()
      .email("Informe um email válido")
      .default("nãoinformado@email.com"),
    salario: Yup.number()
      .positive("Informe um valor positivo")
      .required("Informe um salário"),
    telefones: Yup.array().min(1, "Informe ao menos um telefone"),
    endereco: Yup.object().shape({
      logradouro: Yup.string().required("Informe um logradouro"),
      numero: Yup.number()
        .positive("Informe um número positivo para endereço")
        .integer("Informe um número inteiro para endereço")
        .required("Informe um número para endereço"),
    }),
  });

  try {
    const usuario = await regras.validate(requisicao.body, {
      abortEarly: false,
    });
    // Após validação, retorna o objeto, podendo ser utilizado para salvar no bnco de dados
    console.log(usuario);

    resposta.status(201).json();
  } catch (error: any) {
    console.log(error);
    resposta.status(400).json({ Erro: error.errors });
  }
});

app.listen(PORT as number, () =>
  console.log(`Listening on all interfaces:${PORT}`)
);
