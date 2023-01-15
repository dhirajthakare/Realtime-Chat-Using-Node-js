const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:4200"],
  },
});
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log("connection");
  socket.on('chat message', msg => {
    console.log("server emit",msg);
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
