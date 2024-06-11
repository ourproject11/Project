import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJobs from "../Pages/UpdateJob";
const router = createBrowserRouter([
    {
        path: "/",
        element : <App/>,
        children : [
            { path : "/", element : <Home /> },
            { path : "/login", element : <LoginPage/> },
            { path : "/register", element : <RegisterPage/> },
            { path : "/post-job", element : <CreateJob/> },
            { path : "/my", element : <MyJobs/> },
            { path : "/salary", element : <SalaryPage/> },
            {
                path : "edit-job/:id",
                element : <UpdateJobs/>,
                loader : ({params}) => fetch(`http://localhost:3000/all-jobs/${params.id}`)
            }
    ],
    },
]);
export default router;