const axios = require("axios");

// Centraliza la URL base en variable de entorno
const FUSEKI_BASE = process.env.FUSEKI_ENDPOINT || "http://localhost:3030";

/**
 * Ejecuta una consulta SPARQL en el dataset indicado
 * @param {string} query - La consulta SPARQL
 * @param {string} dataset - El nombre del dataset (ej. "bebidas", "wine")
 */
async function runQuery(query, dataset = "bebidas") {
  const endpoint = `${FUSEKI_BASE}/${dataset}/sparql`;

  try {
    const response = await axios.get(endpoint, {
      params: { query },
      headers: { Accept: "application/sparql-results+json" },
    });
    return response.data;
  } catch (error) {
    console.error(`Error consultando Fuseki (${dataset}):`, error.message);
    throw error;
  }
}

module.exports = { runQuery };
