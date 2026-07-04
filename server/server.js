import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

app.post("/chat", async (req, res) => {

    const { message } = req.body;

    try {

        const completion = await client.chat.completions.create({

            model: "openai/gpt-4.1-mini",

            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],

        });

        res.json({
            reply: completion.choices[0].message.content,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: "API Error",
        });

    }

});

app.listen(3001, () => {
    console.log("Server Start");
});