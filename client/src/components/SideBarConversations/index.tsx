import { Conversations } from "../Conversations";
import { HeaderConversations } from "../HeaderConversations";

export function SidebarConversations() {
  
  return (
    // <aside className="sticky top-0 left-0 h-full w-full overflow-y-scroll border-zinc-700  text-black flex bg-zinc-700">
    <aside className="sticky top-0 left-0 h-full w-full border-r border-zinc-700 text-black flex flex-col bg-zinc-800 overflow-y-hidden">
      <HeaderConversations />
      <Conversations />
    </aside>
  );
}
