//.config para que tome todo mi archivo de dotenv y establezca las variables de entorno
require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

server.listen();