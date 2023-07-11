const express = require('express');
const cors = require('cors');
const cohere = require('cohere-ai');
require('dotenv').config();
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json());

app.post('/summarize', async (req, res) => {
    try {
        const cohereApiKey = process.env.COHERE_API_KEY;
        cohere.init(cohereApiKey);
        const { text } = req.body;
        const response = await cohere.summarize({
            text: text || '',
            length: 'auto',
            format: 'auto',
            model: 'summarize-xlarge',
            additional_command: '',
            temperature: 0.3,
        });

        res.send(response.body.summary);
    } catch (error) {
        console.error('Error summarizing text:', error);
        res.status(500).send('An error occurred while summarizing the text.');
    }
});

app.listen(port, () => {
    console.log('text summarize');
});