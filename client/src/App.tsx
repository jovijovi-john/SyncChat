import { useState } from "react";
import Chat from "./pages/Chat";

import io from "socket.io-client";

import "./index.css";
import MessageForm from "./components/MessageForm";
import { Input, Button } from "@chakra-ui/react";

export const socketClient = io(`ws://localhost:3001`, {
  transports: ["websocket"],
});

function App() {
  return (
    <div className=" h-screen w-full">
      <div className="flex w-full h-screen">
        <aside className="h-full overflow-y-scroll shadow-lg border-r-2 border-zinc-700 bg-zinc-900 w-96 text-black">
          Aside
        </aside>
        <Chat className="flex-1 h-full py-4 flex justify-between flex-col bg-zinc-800 relative" />
        <aside className="h-full overflow-y-scroll shadow-lg border-l-2 border-zinc-700 bg-zinc-900 w-96 text-black">
          Aside
        </aside>
      </div>
    </div>
  );
}

export default App;
