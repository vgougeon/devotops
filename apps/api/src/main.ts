import * as express from 'express';
import path = require('path');

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.use('/', express.static(path.join(__dirname, '../user-interface/')))
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../user-interface/index.html'))
})
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
