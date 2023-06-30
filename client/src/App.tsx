import { useState } from "react";

import "./index.css";
import MessageForm from "./components/MessageForm";
import { Input, Button } from "@chakra-ui/react";

import "./services/socket";
import WebChat from "./pages/WebChat";

function App() {
  return <WebChat />;
}

export default App;
