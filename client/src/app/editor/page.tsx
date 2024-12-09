'use client'
import dynamic from "next/dynamic";

const TipTapEditor = dynamic(() => import("./_components/TipTap"), {
  ssr: false,
});

const Editor = dynamic(() => import("./_components/Editor"), {
  ssr: false,
});

import TailwindEditor from "./_components/Novel";

export default function Page() {
  return (
    <div className="mx-[10rem] my-[10rem] outline-none">
      <TipTapEditor />
      {/* <TipTapEditor/> */}
      {/* <TailwindEditor/> */}
    </div>
  );
}
