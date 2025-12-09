const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint de Fuseki (dataset "bebidas")
const FUSEKI_ENDPOINT =
  process.env.FUSEKI_ENDPOINT || "http://localhost:3030/bebidas/query";

// Importar todas las preguntas desde preguntas.js
const preguntas = require("./preguntas");

// Función auxiliar para inyectar filtro de idioma en la consulta SPARQL
function filtrarPorIdioma(query, lang) {
  if (!lang) return query;
  // Solo aplica si la consulta usa rdfs:label ?label
  if (query.includes("rdfs:label ?label")) {
    return query.replace(
      /rdfs:label\s+\?label\s*\./,
      `rdfs:label ?label . FILTER(lang(?label) = "${lang}")`
    );
  }
  return query;
}

// Ruta raíz para verificar que el backend corre
app.get("/", (req, res) => {
  res.send("✅ Backend corriendo y listo para consultar Fuseki");
});

// Ruta genérica para enviar consultas SPARQL (útil para pruebas rápidas)
app.post("/consultar", async (req, res) => {
  const { query, lang } = req.body;

  const queryConIdioma = filtrarPorIdioma(query, lang);

  try {
    const response = await axios.get(FUSEKI_ENDPOINT, {
      params: { query: queryConIdioma },
      headers: { Accept: "application/sparql-results+json" },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error consultando Fuseki:", error.message);
    res.status(500).json({ error: "Error al ejecutar la consulta SPARQL" });
  }
});

// Nuevo endpoint: devolver todas las preguntas
app.get("/api/preguntas", (req, res) => {
  res.json(preguntas);
});

// Nuevo endpoint: ejecutar una pregunta por id
app.get("/api/preguntas/:id", async (req, res) => {
  const pregunta = preguntas.find((p) => p.id === req.params.id);
  const lang = req.query.lang || "es";

  if (!pregunta) {
    return res.status(404).json({ error: "Pregunta no encontrada" });
  }

  const queryConIdioma = filtrarPorIdioma(pregunta.query, lang);

  try {
    const response = await axios.get(FUSEKI_ENDPOINT, {
      params: { query: queryConIdioma },
      headers: { Accept: "application/sparql-results+json" },
    });
    res.json({ label: pregunta.label, results: response.data });
  } catch (error) {
    console.error("Error consultando Fuseki:", error.message);
    res.status(500).json({ error: "Error al ejecutar la consulta SPARQL" });
  }
});

// Puerto del backend
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
