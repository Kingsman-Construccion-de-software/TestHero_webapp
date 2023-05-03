import  Home  from "./Pages/home/HomePrincipal";
import Login from "./Pages/login/Login";
import Group from "Pages/group";
import Results from "Pages/results";

const AppRoutes = [
  {
    index: true,
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/group",
    element: <Group />,
  },
  {
    path: "/results",
    element: <Results />,
  }
];

export default AppRoutes;
