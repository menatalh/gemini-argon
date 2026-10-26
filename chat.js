import { GoogleGenAI } from "@google/genai";
import { buggyCode } from "./buggy-code";
const client = new GoogleGenAI({});

const first = await client.interactions.create({
    model: "gemini-4-argon",
    input: `Find the bug in this code and give me the fixed version:\n${buggyCode}`,
});
console.log(first.output_text);

const second = await client.interactions.create({
    model: "gemini-4-argon",
    input: "Great. Now what should happen if the array is empty? Update the function to handle that.",
    previous_interaction_id: first.id,
});
console.log("\n--- follow-up ---\n");
console.log(second.output_text);