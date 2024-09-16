// app/api/chatgpt/route.ts
import { NextResponse } from "next/server";
import { ChatGPTAPI } from "chatgpt";

export async function POST(request: Request) {
  const { text } = await request.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing OpenAI API key" }, { status: 500 });
  }

  const chatGPTApi = new ChatGPTAPI({ apiKey });

  const response = await chatGPTApi.sendMessage(text);

  return NextResponse.json({ text: response.text });
}
