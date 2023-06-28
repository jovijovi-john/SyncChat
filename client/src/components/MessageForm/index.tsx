import { Input } from "@chakra-ui/react";

import { socketClient } from "../../App";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { GoPaperclip } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";

import "./styles.css";
import Button from "../Button";

// type MessageFormProps = {
//   message: string;
//   setMessage: React.Dispatch<React.SetStateAction<string>>;
//   sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
// };

export default function MessageForm(
  props: React.FormHTMLAttributes<HTMLFormElement>
) {
  const [message, setMessage] = useState("");
  const [viewSendButton, setViewSendButton] = useState(false);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanMessage: string = message.trim();

    if (cleanMessage.length != 0) {
      const messageObj = {
        content: cleanMessage,
      };

      socketClient.emit("message", messageObj);

      setMessage("");
    }
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value.trim();

    if (inputValue !== "") {
      setViewSendButton(true);
    }

    setMessage(inputValue);
  };

  return (
    <form {...props} noValidate onSubmit={(e) => sendMessage(e)}>
      {/* <Input
        type="text"
        placeholder="Type a message..."
        onChange={(e) => {
          handleChangeText(e);
        }}
        value={message}
        className="text-white bg-zinc-700 w-full break-all h-full break-words"
      /> */}

      <Button classNames="flex  justify-center items-center p-2 w-10 max-w-xl">
        <div className="flex items-center justify-center ">
          <BsEmojiSmile color="#F4F4F5" size={25} />
        </div>
      </Button>

      <Button classNames="flex  justify-center items-center p-2 w-10 max-w-xl">
        <div className="flex items-center justify-center">
          <GoPaperclip color="#F4F4F5" size={25} />
        </div>
      </Button>

      <div
        contentEditable
        className="w-full max-w-7xl text-zinc-100 breakWord h-full overflow-y-scroll max-h-56 bg-zinc-700 outline-none rounded-md p-3"
      ></div>

      <Button classNames="flex  justify-center items-center p-2 w-16 max-w-xl">
        <div className="flex items-center justify-center ">
          <AiOutlineSend color="#F4F4F5" size={25} />
        </div>
      </Button>
    </form>
  );
}
