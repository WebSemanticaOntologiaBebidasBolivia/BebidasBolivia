const express = require("express");
const axios = require("axios");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());
app.use(cors());

// Importar todas las preguntas de cada dataset
const preguntas_bebidas = require("./preguntas_bebidas");
const preguntas_wine = require("./preguntas_wine");
const preguntas_beer = require("./preguntas_beer");
const preguntas_dbpedia = require("./preguntas_dbpedia");

// Mapa de datasets → preguntas
const preguntasMap = {
  bebidas: preguntas_bebidas,
  wine: preguntas_wine,
  beer: preguntas_beer,
  dbpedia: preguntas_dbpedia,
};

// Centralizar la URL base de Fuseki en variable de entorno
const FUSEKI_URL = process.env.FUSEKI_ENDPOINT || "http://localhost:3030";

// Middleware de rate limiting (ejemplo: máx 100 requests por IP cada 15 minutos)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de requests por IP
  message: { error: "Demasiadas solicitudes, intenta más tarde." },
});
app.use(limiter);

// Función auxiliar para inyectar filtro de idioma en la consulta SPARQL
function filtrarPorIdioma(query, lang) {
  if (!lang) return query;
  if (query.includes("rdfs:label ?label")) {
    return query.replace(
      /rdfs:label\s+\?label\s*\./,
      `rdfs:label ?label . FILTER(lang(?label) = "${lang}")`,
    );
  }
  return query;
}

// Ruta raíz para verificar que el backend corre
app.get("/", (req, res) => {
  res.send("✅ Backend corriendo y listo para consultar Fuseki/DBpedia");
});

// Ruta genérica para enviar consultas SPARQL a cualquier dataset
app.post("/consultar", async (req, res) => {
  const { query, lang, dataset } = req.body;

  if (!preguntasMap[dataset]) {
    return res.status(404).json({ error: "Dataset no encontrado" });
  }

  const queryConIdioma = filtrarPorIdioma(query, lang);

  // Endpoint dinámico: Fuseki local o DBpedia externo
  const endpoint =
    dataset === "dbpedia"
      ? "https://dbpedia.org/sparql"
      : `${FUSEKI_URL}/${dataset}/sparql`;

  console.log(
    `[CONSULTA] dataset=${dataset}, lang=${lang}, endpoint=${endpoint}`,
  );
  console.log(`[QUERY] ${queryConIdioma.substring(0, 120)}...`);

  try {
    const response = await axios.get(endpoint, {
      params: { query: queryConIdioma },
      headers: { Accept: "application/sparql-results+json" },
      timeout: 15000, // 15 segundos para DBpedia
    });
    res.json(response.data);
  } catch (error) {
    console.error(`[ERROR] dataset=${dataset}, msg=${error.message}`);
    res.status(500).json({ error: "Error al ejecutar la consulta SPARQL" });
  }
});

// Endpoint: devolver todas las preguntas de un dataset
app.get("/api/preguntas/:dataset", (req, res) => {
  const dataset = req.params.dataset;
  const preguntas = preguntasMap[dataset];
  if (!preguntas) {
    return res.status(404).json({ error: "Dataset no encontrado" });
  }
  console.log(`[PREGUNTAS] dataset=${dataset}, total=${preguntas.length}`);
  res.json(preguntas);
});

// Endpoint: ejecutar una pregunta por id en un dataset
app.get("/api/preguntas/:dataset/:id", async (req, res) => {
  const dataset = req.params.dataset;
  const preguntas = preguntasMap[dataset];
  if (!preguntas) {
    return res.status(404).json({ error: "Dataset no encontrado" });
  }

  const pregunta = preguntas.find((p) => p.id === req.params.id);
  if (!pregunta) {
    return res.status(404).json({ error: "Pregunta no encontrada" });
  }

  const lang = req.query.lang || "es";
  const queryConIdioma = filtrarPorIdioma(pregunta.query, lang);

  // Endpoint dinámico: Fuseki local o DBpedia externo
  const endpoint =
    dataset === "dbpedia"
      ? "https://dbpedia.org/sparql"
      : `${FUSEKI_URL}/${dataset}/sparql`;

  console.log(`[PREGUNTA] dataset=${dataset}, id=${pregunta.id}, lang=${lang}`);
  console.log(`[QUERY] ${queryConIdioma.substring(0, 120)}...`);

  try {
    const response = await axios.get(endpoint, {
      params: { query: queryConIdioma },
      headers: { Accept: "application/sparql-results+json" },
      timeout: 15000,
    });
    res.json({ label: pregunta.label, results: response.data });
  } catch (error) {
    console.error(
      `[ERROR] dataset=${dataset}, pregunta=${pregunta.id}, msg=${error.message}`,
    );
    res.status(500).json({ error: "Error al ejecutar la consulta SPARQL" });
  }
});

// Puerto del backend
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
