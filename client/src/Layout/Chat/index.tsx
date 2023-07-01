import MessageForm from "../../components/MessageForm";
import { HeaderChat } from "../../components/HeaderChat";
import { ChatMessages } from "../../components/ChatMessages";
import "./styles.css";

export default function Chat(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <HeaderChat />

      <ChatMessages />

      <MessageForm className="flex sticky z-10 bottom-0 left-0 flex-1 gap-2 items-center justify-between pt-4 pb-4 px-8 " />
    </div>
  );
}
