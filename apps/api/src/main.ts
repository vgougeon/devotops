import * as express from 'express';
import path = require('path');
import authController from './app/auth.controller';
import userController from './app/user.controller';
require('dotenv').config()
require('./db/db')

const app = express();
app.use(express.urlencoded())
app.use(express.json())

app.use('/api', authController)
app.use('/api', userController)

app.use('/', express.static(path.join(__dirname, '../user-interface/')))
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../user-interface/index.html'))
})
const port = 3333;
const server = app.listen(port, () => {
  console.log(`APP : http://localhost:${port}`);
});
server.on('error', console.error);
