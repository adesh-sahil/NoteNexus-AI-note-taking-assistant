
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { fetchUnsplashImage } from "@/utils/fetchUnsplashImage"; 

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    console.log("User ID:", userId);
    if (!userId) {
      console.log("Unauthorized: No user ID");
      return new NextResponse("unauthorised", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;
    console.log("Received body:", body);
    const imageUrl = await fetchUnsplashImage(name);

    const note_ids = await db
      .insert($notes)
      .values({
        name,
        userId,
        imageUrl,
      })
      .returning({
        insertedId: $notes.id,
      });

    console.log("Note IDs:", note_ids);

    return NextResponse.json({
      note_id: note_ids[0].insertedId,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating notebook:", error.message, error.stack);
    } else {
      console.error("Unknown error:", error);
    }
    return new NextResponse("internal server error", { status: 500 });
  }
}
