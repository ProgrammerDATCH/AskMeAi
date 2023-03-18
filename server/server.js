import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Ask Me Ai',
    })
});

app.post('/', async (req, res) => {
    try {
      const prompt = req.body.prompt;
      const conversationHistory = req.body.conversationHistory || [];
  
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${conversationHistory.join('\n')}\nUser: ${prompt}\nAI:`,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });
  
      const botResponse = response.data.choices[0].text.trim();
      conversationHistory.push(`User: ${prompt}\nAI: ${botResponse}`);
  
      res.status(200).send({
        bot: botResponse,
        conversationHistory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  });
  

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));