import { writeFile } from "node:fs/promises";
import { GoogleGenAI } from "@google/genai";
import { resolve } from "node:dns";
const client = new GoogleGenAI({});

let interaction = await client.interactions.create({
    model: "gemini-4-argon",
    input: 
        "Build a playable Breakout game in a single HTML file,"
        + "with the CSS and JavaScript inline. " +
        "Include a score, three lives, and a restart button." +
        "Reply with only the HTML.",
    background: true,
    generation_config: {
        max_output_tokens: 131072, // without max tokens, background mode stops at about 64,000 tokens
        thinking_level: "high",
    },
});

console.log("Started:", interaction.id);

while (interaction.status === 'in_progress' || interaction.status === "queued") {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    interaction = await client.interactions.get(interaction.id);
    console.log("Status:", interaction.status);
}

const text = interaction.steps
    .filter((step) => step.type === "model_output")
    .flatMap((step) => step.content ?? [])
    .filter((content) => content.type === "text")
    .map((content) => content.text)
    .join("");

const html = text.replace(/^```(?:html)?\s*/i,"").replace(/```\s*$/, "");

await writeFile("game.html", html);
console.log("Saved game.html. Usage:", interaction.usage);