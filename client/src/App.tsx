import { useState } from "react";
import Chat from "./pages/Chat";

import io from "socket.io-client";

import "./index.css";
import MessageForm from "./components/MessageForm";
import { Input, Button } from "@chakra-ui/react";

import "./styles.css";

export const socketClient = io(`ws://localhost:3001`, {
  transports: ["websocket"],
});

function App() {
  return (
    <div className="h-screen w-full red">
      <div className="gridLayout w-full h-screen relative">
        <aside className="sticky top-0 left-0 h-full overflow-y-scroll  border-r-2  border-zinc-700 bg-zinc-200 w-96 text-black">
          Aside
        </aside>
        <Chat className="flex-1 flex justify-between flex-col h-full 2xl:max-w-6xl bg-zinc-800 overflow-y-hidden relative" />
        <aside className="sticky top-0 right-0 h-full overflow-y-scroll  border-l-2 border-zinc-700 bg-zinc-200 w-96 text-black">
          Aside
        </aside>
      </div>
    </div>
  );
}

export default App;
