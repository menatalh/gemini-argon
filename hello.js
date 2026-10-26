import { GoogleGenAI } from "@google/genai";

// first create a client using the official google sdk
// the empty object is because it finds our key from the environment for us
const client = new GoogleGenAI({});

const interactions = await client.interactions.create({
    model: "gemini-4-argon",
    input: "Explain what an API is to someone writing their first line of code. Keep it to three sentences."
});

console.log(interactions.output_text);
