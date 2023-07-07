import LoginForm from "../../components/LoginForm";
import ChatSvg from "../../assets/chat_svg.svg";

import "./styles.css";

export default function LoginScreen() {
  return (
    <div className="h-screen w-full">
      <div className="flex flex-col items-center justify-center gridLayout lg:grid w-full h-screen bg-zinc-900">
        <LoginForm />
        <div className="hidden bgImage lg:flex h-full items-center justify-center border-b-4 border-[#e94f5c]">
          <img className="" src={ChatSvg} alt="" />
        </div>
      </div>
    </div>
  );
}
