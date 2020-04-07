const express = require('express');

const postsRouter = require('/router');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

const port = 4000;
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));
