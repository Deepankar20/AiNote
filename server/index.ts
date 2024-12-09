import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express"

const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const prompt = "generate an image of a person programming";

const result = await model.generateContent(prompt);

const app = express();

// app.get('/stream', async (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');

//   const generateStream = async () => {
//     const response = await model.generateStream({ prompt: req.query.prompt });
//     for await (const chunk of response) {
//       res.write(`data: ${chunk}\n\n`);
//     }
//     res.end();
//   };

//   generateStream().catch((err) => {
//     console.error(err);
//     res.write(`data: ${JSON.stringify({ error: 'Streaming failed' })}\n\n`);
//     res.end();
//   });
// });

app.listen(3000, () => console.log('Server is running on port 3000'));


console.log(result.response.text());
