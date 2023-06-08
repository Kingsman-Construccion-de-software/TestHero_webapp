import Home from "./Pages/home/HomePrincipal";
import Login from "./Pages/login/Login";
import Group from "./Pages/examenesProfesor/ExamGrupo";
import Results from "./Pages/results/Results";
import Questions from "./Pages/questions/questions";
import CrearExamen from "Pages/crearExamen/crearExamen";
import Grupos from "./Pages/grupos/Grupos";
import ResumenExamen from "./Pages/resumenExamen/ResumenExamen";
import ResumenGrupo from "Pages/resumenGrupo/ResumenGrupo";
import PreLogin from "Pages/prelogin/PreLogin";
import LoginAlumno from "Pages/loginalumno/LoginAlumno";
import HomeAlumno from "Pages/homeAlumno/HomeAlumno";
import ExamenesAlumno from "Pages/examenesAlumno/ExamenesAlumno";
import ResumenAlumno from "resumenAlumno/ResumenAlumno";
import Invitacion from "Pages/Invitacion/Invitacion";
import RegistroProfesor from "Pages/RegistroProfesor/RegistroProfesor";
import RegistroAlumnos from "Pages/RegistroAlumnos/RegistroAlumnos";
import EditarExamen from "Pages/crearExamen/EditarExamen";
import Analitica from "Pages/analitica/Analitica";

const AppRoutes = [
  {
    index: true,

    element: <PreLogin />,
  },
  {
    path: "/login/profesor",
    element: <Login />,
  },
  {
    path: "/login/alumno",
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
    path: "/examenes",
    element: <ExamenesAlumno />,
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
    path: "/editar/examen",
    element: <EditarExamen />,
  },
  {
    path: "/questions",
    element: <Questions />,
  },
  {
    path: "/resumen/examen",
    element: <ResumenExamen />,
  },
  {
    path: "/resumen/alumno",
    element: <ResumenAlumno />,
  },
  {
    path: "/resumen/grupo",
    element: <ResumenGrupo />,
  },
  {
    path: "/invitacion",
    element: <Invitacion />,
  },
  {
    path: "/registroProfesor",
    element: <RegistroProfesor />,
  },
  {
    path: "/registroAlumno",
    element: <RegistroAlumnos />,
  },
  {
    path: "/analitica",
    element: <Analitica />,
  },
];

export default AppRoutes;
