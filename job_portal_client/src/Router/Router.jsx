import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import RegisterPage from "../Pages/RegisterPage";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import UpdateJobs from "../Pages/UpdateJob";
import Login from "../components/Login";
import JobDetails from "../Pages/JobDetails";
import ProtectedRoute from "../components/ProtectedRoute";
import CandidateDashboard from "../components/CandidateDashboard";
import EmployeeDashboard from "../components/EmployeeDashboard";
import Welcome from "../components/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element : <Welcome />
      },
      {
        path: "/home",
        element: <ProtectedRoute component={Home} />
      },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/post-job",
        element: <ProtectedRoute component={CreateJob} />
      },
      {
        path: "/my",
        element: <ProtectedRoute component={MyJobs} />
      },
      {
        path: "edit-job/:id",
        element: <ProtectedRoute component={UpdateJobs} />,
        loader: ({ params }) => fetch(`http://localhost:3000/all-jobs/${params.id}`)
      },
      { path: "/login", element: <Login /> },
      { path: "/job/:id", element: <JobDetails /> },
      {
        path: "/candidate-dashboard",
        element: <ProtectedRoute component={CandidateDashboard} />
      },
      {
        path: "/employee-dashboard",
        element: <ProtectedRoute component={EmployeeDashboard} />
      }
    ]
  }
]);

export default router;
