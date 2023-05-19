import Home from "./Pages/home/HomePrincipal";
import Login from "./Pages/login/Login";
import Group from "./Pages/group/Group";
import Results from "./Pages/results/Results";
import Questions from "./Pages/questions/questions";
import CrearExamen from "Pages/crearExamen/crearExamen";
import PreLogin from "Pages/ProfesorOEstudiante/PreLogin";

const AppRoutes = [
  {
    index: true,
    element: <PreLogin />,
  },
  {
    path: "/login",
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
