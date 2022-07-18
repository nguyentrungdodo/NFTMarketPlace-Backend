const express = require("express");
const cors = require("cors");
require("dotenv").config();
const route = require("./src/routes");
const db = require("./src/utils/database");
const { createServer } = require("http");
// const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;
// const { crawlTransactionJob, publishDomainJob } = require('./src/utils/listen-events-contract');

// global.io = new Server(httpServer, { cors: { origin: '*' } });
// global.socketId = {};

// io.on('connection', (socket) => {
//   socket.on('new-account', (address) => {
//     socketId[address] = socket.id;
//   })
// })

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
db.sequelize.sync();

route(app);

// crawlTransactionJob.start();
// publishDomainJob.start();

httpServer.listen(PORT, () => {
  console.log("Server is now listening at port 3000");
});
