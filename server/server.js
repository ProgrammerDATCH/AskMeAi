import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY environment variable is missing');
    process.exit(1);
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

const sessions = {};

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'DATCH Ai Server is well.',
    });
});

app.post('/', async (req, res) => {
    try {
        const userId = req.body.userId;
        const prompt = req.body.prompt;

        if (!userId || typeof userId !== 'string') {
            return res.status(400).send({ error: 'userId is missing or invalid' });
        }

        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).send({ error: 'prompt is missing or invalid' });
        }

        if (!sessions[userId]) {
            sessions[userId] = {
                history: '',
            };
        }

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `${sessions[userId].history} ${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        const botResponse = response.data.choices[0].text.trim();

        sessions[userId].history += ` ${prompt} ${botResponse}`;

        res.status(200).send({
            bot: botResponse,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

const port = process.env.PORT || 5000;
const maxRequestsPerMinute = process.env.MAX_REQUESTS_PER_MINUTE || 60;

app.listen(port, () => console.log(`DATCH Ai Server is running on http://localhost:${port}`));

// Add rate limiting middleware to limit the number of requests per minute
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: maxRequestsPerMinute, // limit each IP to maxRequestsPerMinute requests per windowMs
});
app.use(limiter);
