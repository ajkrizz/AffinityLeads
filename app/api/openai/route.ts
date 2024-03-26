import { OpenAIStream, StreamingTextResponse } from "ai";
import {  OpenAI } from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(request: Request) {
  const { messages } = await request.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
