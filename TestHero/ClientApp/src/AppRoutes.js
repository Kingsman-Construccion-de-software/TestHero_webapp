import Home from "./Pages/home/HomePrincipal";
import Login from "./Pages/login/Login";
import Group from "./Pages/group/Group";
import Results from "./Pages/results/Results";
import Questions from "./Pages/questions/questions";
import CrearExamen from "Pages/crearExamen/crearExamen";
import Grupos from "./Pages/grupos/Grupos";
import ResumenExamen from "./Pages/resumenExamen/ResumenExamen";
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
    path: "/group/resumen",
    element: <Group />,
  },

  {
    path: "/grupos",
    element: <Grupos />,
  },
  {
    path: "/results",
    element: <Results />,
  },
  {
    path: "/crear/examen",
    element: <CrearExamen />,
  },
  {
    path: "/questions",
    element: <Questions />,
  },
  {
    path: "/resumenExamen",
    element: <ResumenExamen />,
  },
];

export default AppRoutes;
