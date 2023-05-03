
import  Home  from "./Pages/home/HomePrincipal";
import Login from "./Pages/login/Login";

const AppRoutes = [
  {
    index: true,
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  }
];

export default AppRoutes;
