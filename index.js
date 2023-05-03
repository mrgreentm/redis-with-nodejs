import Redis from "ioredis";
import express from "express";

const app = express();
// inicializa uma instância do redis
const client = new Redis();

function inserir(chave, valor) {
  try {
    client.set(chave, valor);
  } catch (error) {
    throw error;
  }
}

client.connect(() => {
  console.log("Conectando ao Servidor Redis!!!!!!!!!");

  inserir("aluno", "joao");
});
// caso haja algum erro de conexão com o servidor redis
client.on("error", (error) => {
  console.error("Erro na conexão com Redis", error);
});

app.get("/getByKey/:key", async (req, res) => {
  const key = req.params.key
  const result = await client.get(key);
  console.log(`${key}: `, result);
});
app.listen(3000);
