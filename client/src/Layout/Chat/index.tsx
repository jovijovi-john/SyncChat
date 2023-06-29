import MessageForm from "../../components/MessageForm";

import "./styles.css";
import { HeaderChat } from "../../components/HeaderChat";
import { ChatMessages } from "../../components/ChatMessages";

export default function Chat(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <HeaderChat />

      <ChatMessages />

      <MessageForm className="flex sticky z-10 bg-zinc-800 bottom-0 left-0 flex-1 gap-2 max-w-screen-2xl items-center justify-between pt-4 pb-4 px-8" />
    </div>
  );
}
