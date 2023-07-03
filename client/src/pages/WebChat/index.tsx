import { useEffect, useState } from "react";
import { RoomContent } from "../../components/RoomContent";
import { SidebarConversations } from "../../components/SideBarConversations";

import ChatSvg from "../../assets/chat_svg.svg";

import "./styles.css";

export default function WebChat() {
  const [contentVisible, setContentVisible] = useState<boolean>(true);

  useEffect(() => {
    function handleEscKeyPress(event: KeyboardEvent) {
      if (event.key === "Escape") {
        // Lógica a ser executada quando a tecla "Esc" for pressionada
        console.log("A tecla Esc foi pressionada!");

        if (contentVisible != false) {
          setContentVisible(false);
        }
      }
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [contentVisible]);

  return (
    <div className="h-screen w-full">
      <div className="gridLayout w-full h-screen">
        <SidebarConversations />
        {contentVisible ? (
          <RoomContent />
        ) : (
          <div className="bgImage flex items-center justify-center ">
            <img className="" src={ChatSvg} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
