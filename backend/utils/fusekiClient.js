const axios = require("axios");

const FUSEKI_ENDPOINT = "http://localhost:3030/bebidas/query";

async function runQuery(query) {
  try {
    const response = await axios.get(FUSEKI_ENDPOINT, {
      params: { query },
      headers: { Accept: "application/sparql-results+json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error consultando Fuseki:", error.message);
    throw error;
  }
}

module.exports = { runQuery };
