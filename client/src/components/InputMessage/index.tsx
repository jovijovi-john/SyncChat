import { useEffect, useRef } from "react";

interface InputMessageType {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const InputMessage: React.FC<InputMessageType> = ({ content, setContent }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleContent = (newContent: string) => {
    // Garantindo que as mensagens não estejam vazias
    const cleanContent = newContent.trim();

    if (cleanContent !== "") {
      setContent(cleanContent);
    }
  };

  const handleInput = () => {
    if (contentRef.current) {
      // se a div já foi renderizada, ou seja, se já existe
      const newContent = contentRef.current.textContent || "";

      newContent && handleContent(newContent);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // evitando a quebra de linha
      setContent("");
    }
  };

  useEffect(() => {
    // Esse useEffect vai escutar cada modificação em content
    // A principio nao precisaria, mas como eu quero deixar o 'input' vazio depois de dar o entenr
    // Vai ser necessário fazer isso para limpar o input.
    if (contentRef.current) {
      // se a div já foi renderizada, ou seja, se já existe
      contentRef.current.textContent = content;
    }
  }, [content]);

  return (
    <div
      className="w-full 2xl:max-w-4xl flex-1 text-zinc-100 breakWord h-full overflow-y-scroll max-h-56 bg-zinc-700 outline-none rounded-md p-3"
      contentEditable
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      ref={contentRef}
    />
  );
};

export default InputMessage;
