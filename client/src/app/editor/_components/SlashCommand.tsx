// import { Extension } from '@tiptap/core';
// import { ReactRenderer } from '@tiptap/react';
// import tippy from 'tippy.js';
// import 'tippy.js/dist/tippy.css';

// const SlashCommand = Extension.create({
//   name: 'slashCommand',

//   addOptions() {
//     return {
//       suggestion: null,
//     };
//   },

//   addProseMirrorPlugins() {
//     return [
//       this.editor.createPlugin({
//         props: {
//           handleKeyDown: (view, event) => {
//             if (event.key === '/') {
//               this.options.suggestion.show(view);
//               return true;
//             }
//             return false;
//           },
//         },
//       }),
//     ];
//   },
// });

// const commands = [
//   { title: 'Bullet List', command: ({ editor }) => editor.chain().focus().toggleBulletList().run() },
//   { title: 'Blockquote', command: ({ editor }) => editor.chain().focus().toggleBlockquote().run() },
//   { title: 'Code Block', command: ({ editor }) => editor.chain().focus().toggleCodeBlock().run() },
//   { title: 'Image', command: ({ editor }) => editor.chain().focus().setImage({ src: 'https://via.placeholder.com/150' }).run() },
//   { title: 'YouTube', command: ({ editor }) => editor.chain().focus().setYoutubeVideo({ src: 'https://youtu.be/dQw4w9WgXcQ' }).run() },
// ];

// const SlashCommandMenu = ({ editor, range, onClose }) => {
//   const addCommand = (command) => {
//     command.command({ editor });
//     onClose();
//   };

//   return (
//     <div className="menu">
//       {commands.map((item, index) => (
//         <button key={index} onClick={() => addCommand(item)}>
//           {item.title}
//         </button>
//       ))}
//     </div>
//   );
// };

// const SlashCommandExtension = SlashCommand.configure({
//   suggestion: {
//     show(view) {
//       const { editor } = view;
//       const parentElement = editor.dom.closest('.tiptap');
//       const menu = document.createElement('div');
//       menu.className = 'slash-menu';

//       const reactRoot = new ReactRenderer(SlashCommandMenu, {
//         props: {
//           editor,
//           range: { from: editor.state.selection.from, to: editor.state.selection.to },
//           onClose: () => {
//             menu.remove();
//           },
//         },
//         editor,
//       });

//       tippy(parentElement, {
//         content: menu,
//         interactive: true,
//         trigger: 'manual',
//         placement: 'bottom-start',
//       }).show();
//     },
//   },
// });

// export default SlashCommandExtension;
