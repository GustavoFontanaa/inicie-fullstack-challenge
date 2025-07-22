const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Socket.IO rodando...");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Conectado:", socket.id);

  socket.on("chatMessage", (data) => {
    io.emit("chatMessage", data);
  });

  socket.on("screenshot", (data) => {
    socket.broadcast.emit("screenshot", data);
  });

  socket.on("disconnect", () => {
    console.log("Desconectado:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
