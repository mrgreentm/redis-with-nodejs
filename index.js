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

async function recuperar(chave) {
  try {
    const value = await client.get(chave);
    return value;
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

app.get("/aluno", async (req, res) => {
  const aluno = await recuperar("aluno");
  console.log(aluno);
  //const result = await client.sendCommand(["GET", "foo"]);
});
app.listen(3000);
