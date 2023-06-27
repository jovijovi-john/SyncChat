import { Input, Button } from "@chakra-ui/react";

type MessageFormProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function MessageForm(props: MessageFormProps) {
  return (
    <form
      noValidate
      className="flex w-full gap-4 mb-4"
      onSubmit={(e) => props.sendMessage(e)}
    >
      <Input
        type="text"
        placeholder="Type a message..."
        onChange={(e) => {
          props.setMessage(e.target.value);
        }}
        value={props.message}
        className="text-white"
      />
      <Button type="submit">Send Message</Button>
    </form>
  );
}
