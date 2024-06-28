import CreateNoteDialog from "@/components/CreateNoteDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const dashboardPage = async (props: Props) => {
  const { userId } = auth();
  const notes = await db
    .select()
    .from($notes)
    .where(eq($notes.userId, userId!));

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <div className="max-w-7xl mx-auto p-10">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button className="bg-blue-500 hover:bg-blue-600" size="sm">
              <ArrowLeft className="ml-1 w-4 h-5" />
              Back
            </Button>
          </Link>
          <h1 className="text-4xl font-extrabold">My Notes</h1>
          <UserButton />
        </div>
        <Separator />
        <div className="my-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <CreateNoteDialog />
          {notes.length === 0 ? (
            <div className="col-span-full text-center">
              <h2 className="text-2xl text-gray-500">You have no notes yet.</h2>
            </div>
          ) : (
            notes.map((note) => (
              <Link href={`/notebook/${note.id}`} key={note.id}>
                <div className="group flex flex-col bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105">
                  {note.imageUrl ? (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        alt={note.name}
                        src={note.imageUrl}
                        className="transition-transform duration-300 transform group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="font-bold text-lg">{note.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default dashboardPage;

