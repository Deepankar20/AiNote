"use client";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useRouter } from "next/navigation";

export default function Page() {
  const [input, setInput] = useState<string>();
  const [socket, setSocket] = useState<Socket>();
  const router = useRouter();

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  function handleFormSubmit() {
    router.push("http://localhost:3000/");
    if (socket) {
      socket.emit("event:prompt:input", { input, userId: "someId" });

      router.push("/editor");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-slate-300 w-1/2 flex flex-col items-center gap-[2rem]">
        <p className="font-semibold text-[2.5rem]">Want to make a note?</p>
        <form onSubmit={handleFormSubmit} className="flex w-full">
          <input
            className="bg-[#212121] p-[2rem] w-full rounded-l-full focus:outline-none"
            type="text"
            placeholder="Type your prompt here"
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-slate-600 text-[white] px-6 py-4 rounded-r-full hover:bg-slate-300 hover:text-black focus:outline-none">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
