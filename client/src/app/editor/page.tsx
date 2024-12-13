"use client";
import dynamic from "next/dynamic";

const TipTapEditor = dynamic(() => import("./_components/TipTap"), {
  ssr: false,
});



export default function Page() {
  return (
    <div className="mx-[10rem] my-[10rem] outline-none">
      <div suppressHydrationWarning>
        {/* Component content */}
        <TipTapEditor />
      </div>
      {/* <TipTapEditor/> */}
      {/* <TailwindEditor/> */}
    </div>
  );
}
