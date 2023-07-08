import { useNavigate } from "react-router-dom";
import { getAuthToken, setUser } from "../../services/authService"; // Importe a função getAuthToken da sua implementação de cookies
import connection from "../../configs/connection";
import { getUser } from "../../services/authService";
import { useEffect, useState } from "react";

async function isAuthenticated() {
  const token = getAuthToken();

  const returnFunction: { status: boolean; err?: string } = {
    status: false,
  };

  // Aqui vou consultar a rota para obter usuário, para verificar se esse token é mesmo válido, mesmo que tenha acabado de passar pela página de login

  if (token) {
    await fetch(`${connection.url_api}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json();
        } else if (response.status === 401) {
          throw new Error("Token mal formatado ou não fornecido");
        } else {
          throw new Error("Erro ao autenticar usuário");
        }
      })
      .then((user) => {
        setUser(user);
        returnFunction.status = true;
      })
      .catch((err) => {
        returnFunction.err = err;
        returnFunction.status = false;
      });
  }

  return returnFunction;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  path: string;
}

export default function ProtectedRoute({
  children,
  path,
}: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      const result = await isAuthenticated();

      console.log("Resultado");
      console.log(result);

      if (result.status === false) {
        // navigate("/"); // Redireciona para a página de login se não estiver autenticado
        navigate(path);
      } else {
        setAuthenticated(true);
      }
    }

    checkAuthentication();
  }, []);

  return authenticated && children;
}
