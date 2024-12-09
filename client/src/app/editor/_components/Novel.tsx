"use client";

import { EditorContent, EditorRoot } from "novel";
import { useState } from "react";

const TailwindEditor = () => {
  const [content, setContent] = useState("hi");
  return (
    <EditorRoot>
      <EditorContent
      //@ts-ignore
        initialContent={content}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          //@ts-ignore
          setContent((_prev) => json);
        }}
      />
    </EditorRoot>
  );
};
export default TailwindEditor;
