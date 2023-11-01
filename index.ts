import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { setupWorker } from '@socket.io/sticky';
import cluster from 'cluster';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('public'));

if (cluster.isWorker) {
  const pubClient = createClient({ url: 'redis://localhost:6379' });
  const subClient = pubClient.duplicate();
  Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));
  });
  setupWorker(io);
}

io.on('connection', (socket) => {
  socket.on('join-room', (data) => {
    socket.broadcast.emit('hello', data);
  });
  socket.on('chat-message', (data) => {
    socket.broadcast.emit('send-message', data);
  });
});

httpServer.listen(3000, () => console.log('App running port 3000'));
