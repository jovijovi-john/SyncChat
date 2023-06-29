import { useState } from "react";
import Chat from "./pages/Chat";

import "./index.css";
import MessageForm from "./components/MessageForm";
import { Input, Button } from "@chakra-ui/react";

import "./styles.css";
import { RoomStatus } from "./components/RoomStatus";
import { SidebarConversations } from "./components/SideBarConversations";

import { socketClient } from "./services/socket";

function App() {
  return (
    <div className="h-screen w-full red">
      <div className="gridLayout w-full h-screen relative">
        <SidebarConversations />
        <Chat className="flex-1 flex justify-between flex-col h-full  bg-zinc-800 overflow-y-hidden relative " />
        <RoomStatus />
      </div>
    </div>
  );
}

export default App;
