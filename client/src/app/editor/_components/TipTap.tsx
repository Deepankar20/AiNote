"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useState, useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import { Socket, io } from "socket.io-client";

export default () => {
  const [isEditable, setIsEditable] = useState(true);
  const lowlight = createLowlight(all);
  const [socket, setSocket] = useState<Socket>();

  lowlight.register("html", html);
  lowlight.register("css", css);
  lowlight.register("js", js);
  lowlight.register("ts", ts);

  // Initialize the editor instance
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      ListItem,
      BulletList,
      Blockquote,
      CodeBlock,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image,
      Youtube,
      Placeholder.configure({
        placeholder: "Type / to browse options",
      }),
      Highlight,
    ],
    content: `
      <h1>This is a heading 1</h1>
      <p>This is a <strong>bold</strong> paragraph.</p>
      <h2>This is a heading 2</h2>
      <ul>
        <li>This is a bullet point 1</li>
        <li>This is a bullet point 2</li>
      </ul>
      <p>This is a paragraph with <strong>bold</strong> text and <em>italic</em> text.</p>
    `,

    immediatelyRender: false,
    editable: isEditable,
  });

  useEffect(() => {
    const newSocket = io("http://localhost:8000"); // Replace with your server's URL
    setSocket(newSocket);

    newSocket.on("event:stream", (chunk: any) => {
      console.log("got it", chunk);

      if (editor) {
        editor.chain().focus().insertContent(chunk).run();
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);

      const initialContent = `
      
    `;

      // Set the initial content in the editor
      editor.commands.setContent(initialContent);

      // Gradually insert more content (using full blocks of HTML)
      const lines = [
        "<h1>Another heading 3</h1>",
        "<p>This is a <em>new</em> paragraph with <strong>formatted</strong> text.</p>",
      ];

      let lineIndex = 0;

      // Function to gradually insert content (entire blocks)
      const typeLine = () => {
        if (lineIndex < lines.length) {
          editor.commands.insertContent(lines[lineIndex]);
          lineIndex++;
        }
      };

      // Typing interval (insert one line every 1 second)
      const typingInterval = setInterval(() => {
        typeLine();
        if (lineIndex >= lines.length) {
          clearInterval(typingInterval); // Stop once all lines are inserted
        }
      }, 1000); // Adjust interval for typing speed

      return () => clearInterval(typingInterval);
    }
  }, [isEditable, editor]);

  return (
    <>
      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={isEditable}
            onChange={() => setIsEditable(!isEditable)}
            className="m-[1rem]"
          />
          Editable
        </label>

        {editor && (
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
        )}

        {editor && (
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "is-active" : ""}
          >
            Code
          </button>
        )}

        {editor && (
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            disabled={!editor.can().chain().focus().toggleHighlight().run()}
            className={editor.isActive("Highlight") ? "is-active" : ""}
          >
            Highlight
          </button>
        )}

        {editor && (
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("CodeBlock") ? "is-active" : ""}
          >
            CodeBlock
          </button>
        )}
      </div>

      {/* Toolbar */}

      {/* Editor content section */}
      <div className="tiptap focus:outline-none active:outline-none mt-4">
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .ProseMirror {
          outline: none !important; /* Remove the outline */
          border: none !important; /* Remove any border */
        }

        .ProseMirror:focus {
          outline: none !important; /* Ensure no outline when focused */
          border: none !important; /* Ensure no border when focused */
        }

        .editor-wrapper {
          border: none;
        }
      `}</style>
    </>
  );
};
