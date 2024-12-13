import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: SERVER_URL,
    }
});

let playerScores = [];

io.on("connection", (socket) => {
    //console.log(socket);
    socket.on('scores', (scores) => {
        playerScores.push({ ...scores, id: socket.id });
        socket.emit("playerScores", playerScores);

        setInterval(() => {
            socket.emit("playerScores", playerScores);
        }, 5000);

    });

});

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT} ...\n`);
})

