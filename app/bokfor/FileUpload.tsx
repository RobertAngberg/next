import { NextResponse } from "next/server";
import { ChatGPTAPI } from "chatgpt";

export async function POST(request: Request) {
  const { recognizedText } = await request.json();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Missing OpenAI API key");
    return NextResponse.json(
      { error: "Missing OpenAI API key" },
      { status: 500 }
    );
  }

  const chatGPTApi = new ChatGPTAPI({ apiKey });

  try {
    const res = await chatGPTApi.sendMessage(
      `Please extract the datum and the summa or belopp from this text: ${recognizedText}.
      Make the date in format YYYY-MM-DD. Belopp must be only a number. Strip any trailing zeroes.
      Make it a JSON object with the keys "datum" and "belopp".
      IMPORTANT: Give me ONLY the JSON object. DO NOT include any other text or information.
      The output MUST BE in the following format: {"datum": "YYYY-MM-DD", "belopp": "X"}`
    );

    return NextResponse.json({ text: res.text });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return NextResponse.json(
      { error: "Error calling OpenAI API" },
      { status: 500 }
    );
  }
}
