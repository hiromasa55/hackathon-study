app.post("/chat", async (req, res) => {

    const { message } = req.body;

    const completion = await client.chat.completions.create({

        model: "openai/gpt-4.1-mini",

        messages: [
            {
                role: "system",
                content: "あなたは食事を提案するAIです。"
            },
            {
                role: "user",
                content: message
            }
        ]
    });

    res.json({
        reply: completion.choices[0].message.content
    });

});