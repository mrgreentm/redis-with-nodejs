const redis = require("redis");

const client = redis.createClient();


// conectando ao redis
client.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Conectado ao servidor Redis');
  
  client.set('chave', 'valor', (err, reply) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(reply);
    client.quit();
  });
});
