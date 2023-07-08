import "./index.css";

import "./services/socket";

import WebChat from "./pages/WebChat";
import LoginScreen from "./pages/LoginScreen";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute path="/">
        <WebChat />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
