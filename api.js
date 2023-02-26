// An Express server, which will handle requests coming in and return a
// JSON response. It will use 'body-parser' and 'cors' as middlewares. The OpenAI /v1/completions endpoint will be called from this server.
require('dotenv').config({ path: '.env.local' });
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 1337;

const configuration = new Configuration({
    organization: "org-783QdUEDTPvok1GNJ1sB58GR",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    let engineeredPrompt = "Pretend you are Steve Jobs. Answer with motivational content.\n\n" 
    + "Steve: How can I help you today?\n" 
    + "Person: I want some motivation.\n" 
    + "Steve: You are amazing, you can create any type of business you want.\n" 
    + `Person: ${message}\n`
    + "Steve: "
    console.log(engineeredPrompt, '\n')

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: engineeredPrompt,
        max_tokens: 100,
        temperature: 0,
      });
      
    console.log(response.data);

    if (response.data && response.data.choices) {
        res.json({ message: response.data.choices[0].text.trim() });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}\n`);
});
