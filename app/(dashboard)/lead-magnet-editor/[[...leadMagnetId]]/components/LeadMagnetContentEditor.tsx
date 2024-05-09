import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Editor, EditorContent } from "@tiptap/react";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import CodeBlock from "@tiptap/extension-code-block";
import OrderedList from "@tiptap/extension-ordered-list";
import History from "@tiptap/extension-history";
import LeadMagnetContentPreview from "./LeadMagnetContentPreview";
import { useLeadMagnetEditorContext } from "@/context/LeadMagnetEditorContext";
import axios from 'axios';

const LeadMagnetContentEditor = () => {
  const { edittedLeadMagnet, setEdittedLeadMagnet } = useLeadMagnetEditorContext();
  const [editor, setEditor] = useState<Editor | null>(null);
  const [paraphrasedText, setParaphrasedText] = useState('');

  useEffect(() => {
    if (!editor) {
      const newEditor = new Editor({
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
      });

      setEditor(newEditor);
    }

    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, []);

  const paraphraseText = async () => {
    if (!edittedLeadMagnet || !edittedLeadMagnet.draftBody) {
      console.error('Draft body is undefined or empty.');
      return;
    }
  
    try {
      const response = await axios.post('/api/Rephrase', {
        messages: [
          {
            role: 'user',
            content: edittedLeadMagnet.draftBody
          }
        ]
      });
      
      // Remove HTML tags using a regular expression
      const cleanedText = response.data.replace(/<[^>]*>?/gm, '');
      
      setParaphrasedText(cleanedText);
    } catch (error) {
      console.error('Error paraphrasing text:', error);
    }
  };

  const pasteContent = () => {
    setEdittedLeadMagnet(prev => ({
      ...prev,
      draftBody: paraphrasedText
    }));
  };

  return (
    <div className="flex h-full flex-row overflow-y-auto">
      <div className="m-8 flex w-1/2 flex-col">
        <div className="flex items-center">
          <h1 className="mb-4 w-fit bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">Content Editor</h1>
          <button
            className="ml-4 rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
            onClick={paraphraseText}
          >
            Rewrite
          </button>
        </div>
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

        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Body
          </label>
          {editor && (
            <EditorContent
              className="h-[15vh] w-full appearance-none overflow-y-scroll rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:outline-none"
              editor={editor}
            />
          )}
        </div>
        <div className="mb-4">
        <div className="mb-4">
  <label className="mb-2 block text-sm font-bold text-gray-700">
    Rewrited Content
  </label>
  <div className="flex items-center">
    <textarea
      className="w-[750px] h-[25vh] appearance-none overflow-y-scroll rounded border px-3 py-2 leading-tight text-gray-700 shadow outline-none focus:outline-none"
      value={paraphrasedText}
    />
    <button
      className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 ml-4"
      onClick={pasteContent}
    >
      Paste
    </button>
  </div>
</div>
        </div>
      </div>
      <div className="purple-dotted-pattern flex h-full w-1/2 flex-col overflow-y-auto">
        <div className="mx-12 my-8 flex h-full max-w-lg lg:mx-auto">
          <LeadMagnetContentPreview
            body={edittedLeadMagnet.draftBody}
            title={edittedLeadMagnet.draftTitle}
            subtitle={edittedLeadMagnet.draftSubtitle}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadMagnetContentEditor;
