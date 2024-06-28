// src/app/api/huggingface-completion/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B',
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        },
      }
    );
    const generatedText = response.data[0]?.generated_text || 'No text generated';
    return NextResponse.json({text: generatedText});
  } catch (error) {
    console.error('Error generating text:', error);
    return new NextResponse("internal server error", { status: 500 });
  }
}

