
"use client";
import React, { useState } from "react";
import { Button } from "./button";
import { Loader2, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

type Props = {
  noteId: number;
};

const DeleteButton = ({ noteId }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const deleteNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/deleteNote", {
        noteId,
      });
      return response.data;
    },
  });

  const handleDelete = () => {
    deleteNote.mutate(undefined, {
      onSuccess: () => {
        router.push("/dashboard");
        setIsDialogOpen(false);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant={"destructive"} size="sm">
            <Trash />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this note?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              onClick={handleDelete}
              disabled={deleteNote.isPending}
            >
              {deleteNote.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteButton;
