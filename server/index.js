const express = require('express'),
  app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}!`);
});
