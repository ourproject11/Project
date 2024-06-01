import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
const router = createBrowserRouter([
    {
        path: "/",
        element : <App/>,
        children : [
            { path : "/", element : <Home/> },
            { path : "/login", element : <LoginPage/> },
            { path : "/register", element : <RegisterPage/> },
    ]
    },
]);
export default router;