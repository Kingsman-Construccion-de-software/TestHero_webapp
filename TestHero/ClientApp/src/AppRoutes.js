import Home from "./Pages/home/HomePrincipal";
import Login from "./Pages/login/Login";
import Group from "./Pages/group/Group";
import Results from "./Pages/results/Results";
import Questions from "./Pages/questions/questions";
import CrearExamen from "Pages/crearExamen/crearExamen";
import Grupos from "./Pages/grupos/Grupos";
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
    path: "/group/exams",
    element: <Group edit={true} />,
  },
  {
    path: "/group/results",
    element: <Group edit={false} />,
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
];

export default AppRoutes;
