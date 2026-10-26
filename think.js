import { GoogleGenAI } from "@google/genai";
import { buggyCode } from "./buggy-code";

const client = new GoogleGenAI({});

async function hunt(level){
    const start = Date.now();

    const interaction = await client.interactions.create({
        model: "gemini-4-argon",
        input: `Find the bug in this code and explain it in one short paragraph:\n${buggyCode}`,
        generation_config: {
            thinking_level: level,
        },
    });

    const seconds = ((Date.now()-start)/1000).toFixed(1);
    console.log(`\n--- thinking_level: ${level} (${seconds}s) ---`);
    console.log("Thinking tokens:", interaction.usage?.total_thought_tokens);
    console.log(interaction.output_text);

    await hunt("low");
    await hunt("high");
}