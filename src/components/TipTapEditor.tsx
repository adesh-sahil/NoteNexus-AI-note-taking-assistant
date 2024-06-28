// src/components/TipTapEditor.tsx
"use client";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import Text from "@tiptap/extension-text";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";

type Props = { note: NoteType };

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = React.useState(
    note.editorState || `<h1>${note.name}</h1>`
  );

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });


  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          const selection = this.editor.state.selection;
          const textBeforeCursor = this.editor.getText(0, selection.from);
          
          const lastSentenceMatch = textBeforeCursor.match(/[^.!?]*$/);
          const lastSentence = lastSentenceMatch ? lastSentenceMatch[0] : "";
          const context = lastSentence.slice(-100);
          const prompt = `Continue writing on this paragraph about ${note.name} but don't write this line again just start from where I left.": "${context}"`;
          complete(prompt, this.editor);
          return true;
        },
      };
    },
  });

  const complete = async (prompt: string, editor: any) => {
    try {
      const response = await axios.post('/api/huggingface-completion', { prompt });
      const completion = response.data.text;
  
      if (editor) {
        const generatedText = filterRedundancy(completion, prompt);
        editor.commands.insertContent(generatedText);
      }
    } catch (error) {
      console.error('Error completing text:', error);
    }
  };
  
  const filterRedundancy = (generatedText: string, prompt: string) => {
    // Example implementation: Check for redundancy and filter out overlapping parts
    if (generatedText.startsWith(prompt)) {
      return generatedText.slice(prompt.length).trim();
    }
    return generatedText;
  };
  

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });


  const debouncedEditorState = useDebounce(editorState, 500);

  React.useEffect(() => {
    if (debouncedEditorState === "") return;
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        console.log("success update!", data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [debouncedEditorState]);

  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant={"outline"} className="text-gray-800">
          {saveNote.isPending ? "Saving..." : "Saved"}
        </Button>
      </div>

      <div className="prose prose-sm w-full mt-4 text-white">
        <EditorContent editor={editor} />
      </div>
      <div className="h-4"></div>
      <span className="text-sm">
        Tip: Press{" "}
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
          Shift + A
        </kbd>{" "}
        for AI autocomplete
      </span>
    </>
  );
};

export default TipTapEditor;



