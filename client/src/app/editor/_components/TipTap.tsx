import { EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'

export default () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `
      <p>
        This is an example of a Medium-like editor. Enter a new line and some buttons will appear.
      </p>
      <p></p>
    `,
  })

  const [isEditable, setIsEditable] = React.useState(true)

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
    }
  }, [isEditable, editor])

  return (
    <>
      <div className="control-group">
        <label>
          <input type="checkbox" checked={isEditable} onChange={() => setIsEditable(!isEditable)} />
          Editable
        </label>
      </div>
      
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="floating-menu flex bg-gray-300 text-black p-1 rounded-lg">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-1.5 rounded-md ${editor.isActive('heading', { level: 1 }) ? 'bg-white text-purple-600 hover:text-purple-800' : 'hover:bg-gray-400'}`}
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-1.5 rounded-md ${editor.isActive('heading', { level: 2 }) ? 'bg-white text-purple-600 hover:text-purple-800' : 'hover:bg-gray-400'}`}
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-1.5 rounded-md ${editor.isActive('bulletList') ? 'bg-white text-purple-600 hover:text-purple-800' : 'hover:bg-gray-400'}`}
            >
              Bullet list
            </button>
          </div>
        </FloatingMenu>
      )}

      <div className="tiptap">
        <EditorContent editor={editor} />
      </div>
    </>
  )
}
