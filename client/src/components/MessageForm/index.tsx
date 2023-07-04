import { useEffect, useState, useRef, useContext } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { socketClient } from "../../services/socket";
import Button from "../Button";
import InputMessage from "../InputMessage";
import "./styles.css";
import { RoomContext } from "../../contexts/RoomContext";

export default function MessageForm(
  props: React.FormHTMLAttributes<HTMLFormElement>
) {
  const [message, setMessage] = useState<string>("");
  const { idRoom, setIdRoom } = useContext(RoomContext);

  const messageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleDivContent = (newContent: string) => {
    // Garantindo que as mensagens não estejam vazias
  };

  const sendMessage = () => {
    const cleanMessage: string = message.trim();

    if (cleanMessage.length != 0) {
      const messageObj = {
        content: cleanMessage,
        idRoom: idRoom,
      };

      socketClient.emit("message", messageObj);

      setMessage("");
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
        setMessage(newContent);
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
      messageRef.current.textContent = message;
    }
  }, [message]);

  return (
    <form {...props} onSubmit={handleSubmit}>
      <Button classNames="flex justify-center items-center p-2 w-10 max-w-xl">
        <BsEmojiSmile color="#F4F4F5" size={25} />
      </Button>

      <Button classNames="flex justify-center items-center p-2 w-10 max-w-xl">
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
        classNames="flex justify-center items-center p-2 w-16 max-w-xl"
      >
        <AiOutlineSend color="#F4F4F5" size={25} />
      </Button>
    </form>
  );
}
