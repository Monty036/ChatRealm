const express = require("./config/express.js");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const { protect } = require('./middleware/socketMiddleware.js');


dotenv.config();

const port = process.env.PORT || 5000;

//establish socket.io connection
const app = express.init();
const server = require("http").createServer(app);
const serverOptions = {};
if(process.env.NODE_ENV == 'development') {
  serverOptions.cors = { origin: 'http://localhost:3000', credentials: true };
}

// Enable Socket.io authMiddleware
const io = new Server(server, serverOptions);
io.of(/.*/).use(protect);

io.of("/api/socket").on("connection", (socket) => {
  if(process.env.NODE_ENV === 'development') console.log("socket.io: User connected: ", socket.user.username);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.user.username);
  });
});

//start the server
server.listen(port, () => console.log(`Server now running on port ${port}!`));

//connect to db
console.log('CONNECTING TO DB: ', process.env.DB_URI);
mongoose.connect(process.env.DB_URI);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connected");
})

//   console.log("Setting change streams");
//   const thoughtChangeStream = connection.collection("thoughts").watch();

//   thoughtChangeStream.on("change", (change) => {
//     switch (change.operationType) {
//       case "insert":
//         const thought = {
//           _id: change.fullDocument._id,
//           name: change.fullDocument.name,
//           description: change.fullDocument.description,
//         };

//         io.of("/api/socket").emit("newThought", thought);
//         break;

//       case "delete":
//         io.of("/api/socket").emit("deletedThought", change.documentKey._id);
//         break;
//     }
//   });
// });
