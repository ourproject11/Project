import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import RegisterPage from "../Pages/RegisterPage";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJobs from "../Pages/UpdateJob";
import Login from "../components/Login";
import JobDetails from "../Pages/JobDetails";
const router = createBrowserRouter([
    {
        path: "/",
        element : <App/>,
        children : [
            { path : "/", element : <Home /> },
            { path : "/register", element : <RegisterPage/> },
            { path : "/post-job", element : <CreateJob/> },
            { path : "/my", element : <MyJobs/> },
            { path : "/salary", element : <SalaryPage/> },
            { path : "edit-job/:id", element : <UpdateJobs/>, loader : ({params}) => fetch(`http://localhost:3000/all-jobs/${params.id}`)},

            {path : "/login" , element : <Login/> },
            {path:"/job/:id",  element:<JobDetails/>}
    ],
    },
]);
export default router;