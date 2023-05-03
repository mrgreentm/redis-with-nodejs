import Redis from "ioredis";
import express from "express";

const app = express();
app.use(express.json());

// inicializa uma instância do redis
const client = new Redis();

function returnKeyParam(params) {
  return params.key;
}

app.get("/getByKey/:key", async (req, res) => {
  const key = returnKeyParam(req.params);
  try {
    const result = await client.get(key);
    res.send(result);
  } catch (error) {
    throw error;
  }
});

app.post("/setByKey/:key", async (req, res) => {
  const body = req.body;
  const key = returnKeyParam(req.params);
  try {
    client.set(key, body.value);
    res.send("Valor inserido com sucesso!");
  } catch (error) {
    throw error;
  }
});

app.put("/putByKey/:key", async (req, res) => {
  const body = req.body;
  const key = returnKeyParam(req.params);
  try {
    client.set(key, body.value);
    res.send("Valor alterado com sucesso!");
  } catch (error) {
    throw error;
  }
});

app.delete("/deleteByKey/:key", async (req, res) => {
  const key = returnKeyParam(req.params);
  try {
    client.del([key]);
    res.send("Valor deletado com sucesso!");
  } catch (error) {
    throw error;
  }
});

client.connect(() => {
  console.log("Conectando ao Servidor Redis!!!!!!!!!");
});
// caso haja algum erro de conexão com o servidor redis
client.on("error", (error) => {
  console.error("Erro na conexão com Redis", error);
});
app.listen(3000);
