'use client'
import dynamic from "next/dynamic";

const TipTapEditor = dynamic(() => import("./_components/TipTap"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <div>Here is editor</div>
      <TipTapEditor />
    </div>
  );
}
