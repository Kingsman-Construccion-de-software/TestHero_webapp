import  Home  from "./Pages/home/HomePrincipal";
import Login from "./Pages/login/Login";
import Group from "./Pages/group/Group";
import Results from "./Pages/results/Results";
import Questions from "./Pages/questions/questions";

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
  },
  {
    path: "/questions",
    element: <Questions/>
  }
];

export default AppRoutes;
