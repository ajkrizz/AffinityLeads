import { OpenAIStream, StreamingTextResponse } from "ai";
import { OpenAI } from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(request: Request) {

  try {
    const { messages } = await request.json();

    // Include role: 'User' in the messages array
    const messagesWithRole = messages.map((message: any) => ({
      ...message,
      role: "user",
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: messagesWithRole,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error handling chatbot request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
