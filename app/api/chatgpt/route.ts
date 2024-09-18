import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { text } = await request.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("Missing OpenAI API key");
    return NextResponse.json(
      { error: "Missing OpenAI API key" },
      { status: 500 }
    );
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Please extract the datum and the summa or belopp from this text: ${text}.
          Make the date in format YYYY-MM-DD. Belopp must be only a number. Strip any trailing zeroes.
          Make it a JSON object with the keys "datum" and "belopp". 
          IMPORTANT: Give me ONLY the JSON object. DO NOT include any other text or information.
          The output MUST BE in the following format: {"datum": "YYYY-MM-DD", "belopp": "X"}`,
        },
      ],
    });

    const responseText = chatCompletion.choices[0].message.content;

    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Error calling OpenAI API" },
      { status: 500 }
    );
  }
}
