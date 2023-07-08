import { useState } from "react";
import { useNavigate } from "react-router-dom";
import connection from "../../configs/connection";
import Button from "../Button";
import { setAuthToken } from "../../services/authService";

export default function LoginForm() {
  const navigate = useNavigate();

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

    if (userName.trim() !== "" && password.trim() !== "") {
      if (page === "cadastro") {
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
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else if (response.status === 400) {
              throw new Error("Usuário já existe.");
            } else if (response.status === 500) {
              throw new Error("Erro ao criar usuário");
            } else {
              throw new Error("Erro desconhecido ao criar usuario");
            }
          })
          .then((data) => {
            console.log("Usuário criado:", data);
            setAuthToken(data.token);
            setUserName("");
            setPassword("");

            navigate("/chat");
          })
          .catch((error) => {
            console.error("Erro ao criar usuário:", error);
          });
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
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else if (response.status === 404) {
              throw new Error("Usuário não encontrado.");
            } else if (response.status === 401) {
              throw new Error("Credenciais inválidas.");
            } else {
              throw new Error("Erro durante o login.");
            }
          })
          .then((data) => {
            setUserName("");
            setPassword("");
            setAuthToken(data);
            navigate("/chat");
          })
          .catch((error) => {
            console.error("Erro durante o login:", error);
            // Código para lidar com o erro de acordo com a mensagem ou status
          });
      }
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
