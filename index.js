const express = require('express');

const postsRouter = require('./src/router');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`\n== Server running on http://localhost:4000 ==\n`));
