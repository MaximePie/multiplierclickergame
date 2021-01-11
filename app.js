const express = require("express");
const http = require("http");
const path = require('path');
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
// const index = require("./routes/index");


const cors = require('cors')
const app = express();

// Deployement config
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// End deployment
app.use(cors());
// app.use('/', index);

const server = http.createServer(app);

const router = express.Router();

router.get("/", (req, res) => {
    console.log("HAHA");
    res.send({ response: "I am alive" }).status(200);
});

const io = socketIo(server, {origins:`localhost:* http://localhost:* http://www.localhost:*`});

let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
