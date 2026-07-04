import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { menuItems } from "../shared/menuData.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

const activeMenus = menuItems.filter(menu => menu.isActive);

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

    返答は必ずJSONのみで返してください。

    {
    "id": 数字,
    "name": メニュー名,
    "image": 画像のパス,
    "reason": "理由"
    "price": 価格の数字,
    }

    説明文やjsonは付けないでください。
    `;

    const menuText = activeMenus
    .map(menu => {
        return `
        id: ${menu.id}
        画像のパス(image): ${menu.image}
        メニュー名:${menu.name}
        価格:${menu.price}円
        カロリー:${menu.calories ?? "不明"}kcal`;
    })
    .join("\n\n");

    const userPrompt = `
    ユーザーの気分
    ${message}

    販売中のメニュー

    ${menuText}

    この中から1つだけ選んでください。
    
    ・必ず上のメニューから選ぶ
    ・存在しない料理は作らない
    ・理由も答える
    ・必ずidを返してください
    ・画像のパスも返す
    ・メニュー名も返す
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

        const content = completion.choices[0].message.content;
        const result = JSON.parse(content);

        res.json(result);

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