// An Express server, which will handle requests coming in and return a
// JSON response. It will use 'body-parser' and 'cors' as middlewares.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 1337;

app.use(bodyParser.json());
app.use(cors());

app.post('/', (_req, res) => {
    res.json({ message: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
