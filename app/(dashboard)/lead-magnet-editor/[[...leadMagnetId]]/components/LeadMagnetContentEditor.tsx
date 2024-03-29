// LeadMagnetContentEditor.tsx

import React, { useEffect, useState } from "react";
import { Editor, EditorContent } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import { useLeadMagnetEditorContext } from "@/context/LeadMagnetEditorContext";
import axios from "axios";
import LeadMagnetContentPreview from "./LeadMagnetContentPreview";
import { Button } from "@/components/ui/button";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import CodeBlock from "@tiptap/extension-code-block";
import OrderedList from "@tiptap/extension-ordered-list";
import History from "@tiptap/extension-history";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

function LeadMagnetContentEditor() {
  const { edittedLeadMagnet, setEdittedLeadMagnet } =
    useLeadMagnetEditorContext();

  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    if (!editor) {
      setEditor(
        new Editor({
          extensions: [
            Document,
            Paragraph,
            Text,
            Bold,
            Italic,
            Heading.configure({
              levels: [1, 2, 3],
            }),
            CodeBlock,
            BulletList,
            OrderedList,
            ListItem,
            History,
          ],
          content: edittedLeadMagnet.draftBody,
          onUpdate: ({ editor }) => {
            setEdittedLeadMagnet((prev) => ({
              ...prev,
              draftBody: editor.getHTML(),
            }));
          },
        })
      );
    }

    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, []);

  const handleRephrase = async () => {
    // Handle rephrasing logic here
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: edittedLeadMagnet.draftBody,
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      // Update the lead magnet body with the rephrased content
      setEdittedLeadMagnet((prev) => ({
        ...prev,
        draftBody: response.data.choices[0].text.trim(),
      }));
    } catch (error) {
      console.error("Error rephrasing content:", error);
    }
  };

  return (
    <div className="flex h-full flex-row">
      <div className="m-8 flex w-1/2 flex-col">
        <h1 className="mb-4 text-3xl font-bold text-purple-500">
          Content Editor
        </h1>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Title
          </label>
          <Input
            type="text"
            value={edittedLeadMagnet.draftTitle}
            onChange={(e) =>
              setEdittedLeadMagnet((prev) => ({
                ...prev,
                draftTitle: e.target.value,
              }))
            }
            placeholder="What is the title of your lead magnet?"
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Sub Title
          </label>
          <Input
            type="text"
            value={edittedLeadMagnet.draftSubtitle}
            onChange={(e) =>
              setEdittedLeadMagnet((prev) => ({
                ...prev,
                draftSubtitle: e.target.value,
              }))
            }
            placeholder="What is the subtitle of your lead magnet?"
          />
        </div>

        <div className="mb-10 flex flex-col overflow-y-auto rounded-lg bg-white p-4 shadow-lg md:mb-10 md:p-8 relative">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Body
          </label>
          {editor && (
            <EditorContent
              className="h-[50vh] w-full appearance-none overflow-y-scroll rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:outline-none"
              editor={editor}
            />
          )}
        </div>
      </div>
      <div className="purple-dotted-pattern flex h-full w-1/2 flex-col overflow-y-auto">
        <div className="mx-12 my-8 flex h-full max-w-lg lg:mx-auto">
          <LeadMagnetContentPreview
            body={edittedLeadMagnet.draftBody}
            title={edittedLeadMagnet.draftTitle}
            subtitle={edittedLeadMagnet.draftSubtitle}
            onRephrase={handleRephrase} // Pass down the handleRephrase function
          />
        </div>
      </div>
    </div>
  );
}

export default LeadMagnetContentEditor;
