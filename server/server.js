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

const menuList = [
    "からあげ定食",
    "カツカレー",
    "きつねうどん",
    "醤油ラーメン",
    "焼き魚定食",
    "ハンバーグ定食",
];

app.post("/chat", async (req, res) => {

    console.log(process.env.OPENROUTER_API_KEY);
    console.log(process.env.OPENROUTER_MODEL);
    const { message } = req.body;

    const systemPrompt = `
    あなたは学食のメニュー提案AIです。

    ユーザーの気分や食べたいものから学食のメニューを1つ提案してください。

    返答形式は以下です。

    今日のメニューはこれで行きましょう！

    ○○

    理由：
    ○○
    `;

    const userPrompt = `
    ユーザーの気分
    ${message}

    候補メニュー
    ${menuList.join("\n")}

    この中から1つだけ選んでください。
    理由も添えてください。
    `;


    try {

        const completion = await client.chat.completions.create({

            model: process.env.OPENROUTER_MODEL,

            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],

        });

        res.json({
            reply: completion.choices[0].message.content,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            reply: "AIとの通信に失敗しました。",
        });

    }

});

app.listen(3001, () => {
    console.log("Server Start");
});