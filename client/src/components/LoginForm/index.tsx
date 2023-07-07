import { useState } from "react";
import connection from "../../configs/connection";
import { Input } from "@chakra-ui/react";
import Button from "../Button";

export default function LoginForm() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [page, setPage] = useState<"login" | "cadastro">("login");

  function handlePage() {
    if (page === "cadastro") {
      setPage("login");
    } else if (page === "login") {
      setPage("cadastro");
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (page === "cadastro") {
      if (userName.trim() !== "" || password.trim() !== "") {
        fetch(`${connection.url_api}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userName,
            password: password,
          }),
        })
          .then((data) => data.json())
          .then((data) => {
            setUserName("");
            setPassword("");
            console.log(data);
          });
      }
    } else {
      fetch(`${connection.url_api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          setUserName("");
          setPassword("");
        });
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-xl relative">
        <h1 className="text-[#e94f5c] text-5xl mb-12 text-left font-bold">
          {page === "login" ? "Bem vindo !" : "Cadastre-se"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-md ml-auto w-full gap-2"
        >
          <label htmlFor="userName" className="text-zinc-400 text-lg ">
            UserName
          </label>
          <input
            required
            type="text"
            name="userName"
            placeholder="Digite seu username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={
              "bg-zinc-700 caret-[#e94f5c] border-none p-4 rounded-lg w-96 text-zinc-100 outline-none focus:outline-2 focus:outline-[#e94f5c]"
            }
            color={"#fff"}
          />
          <label htmlFor="password" className="text-zinc-400 text-lg mt-2">
            Password
          </label>
          <input
            required
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={
              "bg-zinc-700 caret-[#e94f5c] border-none mb-4  p-4 rounded-lg w-96 text-zinc-100 outline-none focus:outline-2 focus:outline-[#e94f5c]"
            }
            color={"#fff"}
          />
          <Button
            type="submit"
            classNames="bg-[#e94f5c] rounded-2xl mt-4 p-4 font-medium hover:opacity-90"
            onClick={handleSubmit}
          >
            {page === "cadastro" ? "Cadastre-se" : "Entrar"}
          </Button>
        </form>

        <div className="text-zinc-500 text-sm  mt-8 flex justify-between">
          <span className="hover:text-[#e94f5c] ease-in-out transition-colors duration-200 cursor-pointer">
            Esqueci minha senha
          </span>
          <span
            className="hover:text-[#e94f5c] ease-in-out transition-colors duration-200 cursor-pointer"
            onClick={handlePage}
          >
            {page === "cadastro" ? "Já tem uma conta?" : "Criar nova conta"}
          </span>
        </div>
      </div>
    </div>
  );
}
