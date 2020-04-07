const express = require('express');

const postsRouter = require('/router');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

server.listen(4000, () => console.log(`\n== Server running on http://localhost:4000 ==\n`));
