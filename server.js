const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;
const NEWS_API_KEY = '7caa5dbd3be04b8a8042811b9910adde';

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  const interval = setInterval(() => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`)
      .then((response) => {
        const articles = response.data.articles;
        socket.emit('news', { articles });
      })
      .catch((error) => {
        console.log(error);
      });
  }, 5000);

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
