import Home from "./Pages/home/HomePrincipal";
import Login from "./Pages/login/Login";
import Group from "./Pages/group/Group";
import Results from "./Pages/results/Results";
import Questions from "./Pages/questions/questions";
import CrearExamen from "Pages/crearExamen/crearExamen";
import Grupos from "./Pages/grupos/Grupos";
import ResumenExamen from "./Pages/resumenExamen/ResumenExamen";
import ExamenAlumno from "Pages/examenAlumno/ExamenAlumno";
import PreLogin from "Pages/prelogin/PreLogin";
import LoginAlumno from "Pages/loginalumno/LoginAlumno";
import HomeAlumno from "Pages/homeAlumno/HomeAlumno";
const AppRoutes = [
  {
    index: true,
    element: <PreLogin />,
  },
  {
    path: "/loginprofesor",
    element: <Login />,
  },
  {
    path: "/loginalumno",
    element: <LoginAlumno />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/homealumno",
    element: <HomeAlumno />,
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
  {
    path: "/examenAlumno",
    element: <ExamenAlumno />,
  },
];

export default AppRoutes;
