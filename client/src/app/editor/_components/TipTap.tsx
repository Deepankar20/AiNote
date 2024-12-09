"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from '@tiptap/extension-text-style';

export default () => {
  const [isEditable, setIsEditable] = useState(true);
  console.log(isEditable);
  

  // Initialize the editor instance
  const editor = useEditor({
    extensions: [StarterKit, TextStyle],
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
    editable:isEditable
  });

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
      </div>

      {/* Toolbar */}

      {/* Editor content section */}
      <div className="focus:outline-none active:outline-none mt-4">
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
