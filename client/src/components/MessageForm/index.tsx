import { useEffect, useState, useRef, useContext } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { socketClient } from "../../services/socket";
import Button from "../Button";
import "./styles.css";
import { RoomContext } from "../../contexts/RoomContext";
import { MessageType } from "../../types/Message";
import { UserContext } from "../../contexts/UserContext";

export default function MessageForm(
  props: React.FormHTMLAttributes<HTMLFormElement>
) {
  const { roomId } = useContext(RoomContext);
  const { user, token } = useContext(UserContext);

  const [content, setContent] = useState<string>("");
  const [message, setMessage] = useState<MessageType>();

  const messageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const sendMessage = () => {
    const cleanMessage: string = content.trim();
    if (cleanMessage.length != 0) {
      const messageObj: MessageType = {
        content: cleanMessage,
        roomId: roomId,
        userId: user.id,
      };

      console.log(messageObj);

      setMessage(messageObj);

      socketClient.emit("message", token, messageObj);
      setContent("");
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    // TODO: Melhorar isso, essa função já está obsoleta
    const plainText = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, plainText);
  };

  const handleInput = () => {
    if (messageRef.current) {
      // se a div já foi renderizada, ou seja, se já existe
      if (messageRef.current) {
        const newContent = messageRef.current.textContent || "";
        setContent(newContent);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // evitando a quebra de linha
      formRef.current?.dispatchEvent(new Event("submit", { cancelable: true })); // Para tirar o prevent default

      sendMessage();
    } else if (event.key === "Backspace") {
      event.stopPropagation();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendMessage();
  };

  useEffect(() => {
    // Esse useEffect vai escutar cada modificação em content
    // A principio nao precisaria, mas como eu quero deixar o 'input' vazio depois de dar o entenr
    // Vai ser necessário fazer isso para limpar o input.
    if (messageRef.current) {
      // se a div já foi renderizada, ou seja, se já existe
      messageRef.current.textContent = content;
    }
  }, [content]);

  return (
    <form {...props} onSubmit={handleSubmit}>
      <Button classNames="hidden sm:flex justify-center items-center p-2 w-10 max-w-xl">
        <BsEmojiSmile color="#F4F4F5" size={25} />
      </Button>

      <Button classNames=" sm:flex justify-center items-center p-2 w-10 max-w-xl">
        <GoPaperclip color="#F4F4F5" size={25} />
      </Button>

      <div className="w-full flex-1 overflow-hidden p-3 bg-zinc-700 rounded-md ">
        <div
          className="w-full flex-1 text-zinc-100 breakWord h-full overflow-y-scroll max-h-56  outline-none "
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          ref={messageRef}
        />
      </div>

      <Button
        type={"submit"}
        classNames="flex justify-center items-center p-2 w-10 sm:w-16 max-w-xl"
      >
        <AiOutlineSend color="#F4F4F5" size={25} />
      </Button>
    </form>
  );
}
