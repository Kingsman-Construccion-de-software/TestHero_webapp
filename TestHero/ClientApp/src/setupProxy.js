const { createProxyMiddleware } = require("http-proxy-middleware");
const { env } = require("process");

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "https://localhost:65168";

const context = [
  "/api/login",
  "/api/login/alumno",
  "/api/pregunta",
  "/api/examen",
  "/api/respuesta",
  "/api/profesor",
  "/api/grupo",
  "/api/etiqueta",
  "/api/etiqueta/examen",
  "/api/grupo/profesor",
  "/api/pregunta/examen",
  "/api/examen/grupo",
  "/api/examen/profesor",
  "/api/respuesta/pregunta",
  "/api/alumno/examen",
  "/api/alumno/pregunta",
  "/api/alumno",
  "api/grupo/alumno",
  "api/grupo/alumnos",
  "/api/login/alumno",
  "/api/alumno/examenes",
  "/api/alumno/pregunta/",
  "/api/alumnopregunta/",
  "api/alumnosRegistro",
  "api/examen/poder/",
  "api/etiquetanombre/",
  "api/examenpoder/",
  "api/examen/promedio",
  "api/examen/desvest",
  "api/examen/tasaaprob",
  "api/examen/masdificil",
];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: "Keep-Alive",
    },
  });

  app.use(appProxy);
};
