import React, { useState } from "react";
import axios from "axios";
import locales from "../i18n/locales";

export default function ConsultarOntologia() {
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [resultado, setResultado] = useState(null);
    const [idioma, setIdioma] = useState("es");
    const [cargando, setCargando] = useState(false);
    const [fuenteBusqueda, setFuenteBusqueda] = useState("local");

    // Fuentes reales
    const FUENTE_LOCAL = "http://www.semanticweb.org/asus/ontologies/2025/9/BebidasBolivia#";
    const FUENTE_DBPEDIA = "http://dbpedia.org/";

    // ---------------- CONSULTAS SPARQL ----------------
    const construirConsultaLocal = (termino) => {
        return `
            PREFIX bb: <http://www.semanticweb.org/asus/ontologies/2025/9/BebidasBolivia#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            
            SELECT DISTINCT ?elemento ?tipo ?relacion ?relacionadoCon
            WHERE {
                {
                    ?elemento rdf:type owl:Class .
                    BIND("Clase" AS ?tipo)
                    OPTIONAL { 
                        ?elemento rdfs:subClassOf ?relacionadoCon .
                        BIND("subclase de" AS ?relacion)
                    }
                    FILTER (CONTAINS(LCASE(STR(?elemento)), LCASE("${termino}")))
                }
                UNION
                {
                    ?elemento rdf:type owl:ObjectProperty .
                    BIND("Propiedad" AS ?tipo)
                    OPTIONAL { 
                        ?elemento rdfs:domain ?relacionadoCon .
                        BIND("dominio" AS ?relacion)
                    }
                    FILTER (CONTAINS(LCASE(STR(?elemento)), LCASE("${termino}")))
                }
                UNION
                {
                    ?clase rdf:type owl:Class .
                    ?clase rdfs:subClassOf ?elemento .
                    BIND("Superclase" AS ?tipo)
                    BIND("superclase de" AS ?relacion)
                    BIND(?clase AS ?relacionadoCon)
                    FILTER (CONTAINS(LCASE(STR(?elemento)), LCASE("${termino}")))
                }
            }
            LIMIT 100
        `;
    };

    const construirConsultaDBpedia = (termino) => {
        return `
            PREFIX dbo: <http://dbpedia.org/ontology/>
            PREFIX dbr: <http://dbpedia.org/resource/>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            
            SELECT DISTINCT ?bebida ?label ?tipo ?pais ?graduacion
            WHERE {
                ?bebida rdf:type dbo:Beverage .
                ?bebida rdfs:label ?label .
                OPTIONAL { ?bebida dbo:type ?tipo }
                OPTIONAL { ?bebida dbo:country ?pais }
                OPTIONAL { ?bebida dbo:alcoholPercentage ?graduacion }
                FILTER (LANG(?label) = "es" || LANG(?label) = "en")
                FILTER (
                    CONTAINS(LCASE(?label), LCASE("${termino}")) ||
                    CONTAINS(LCASE(STR(?tipo)), LCASE("${termino}")) ||
                    CONTAINS(LCASE(STR(?pais)), LCASE("${termino}"))
                )
            }
            LIMIT 20
        `;
    };

    // ---------------- EJECUTAR BÚSQUEDA ----------------
    const ejecutarBusqueda = async () => {
        if (!terminoBusqueda.trim()) return;
        
        setCargando(true);
        try {
            let consultaSPARQL;
            let endpoint;

            if (fuenteBusqueda === "local") {
                consultaSPARQL = construirConsultaLocal(terminoBusqueda);
                endpoint = "http://localhost:5000/consultar";
                
                const response = await axios.post(endpoint, { query: consultaSPARQL });

                const datos = response.data.results.bindings.map(fila => ({
                    ...fila,
                    fuente: { value: FUENTE_LOCAL }
                }));

                setResultado(datos);

            } else {
                consultaSPARQL = construirConsultaDBpedia(terminoBusqueda);
                endpoint = "https://dbpedia.org/sparql";
                
                const response = await axios.get(endpoint, {
                    params: { query: consultaSPARQL, format: 'json' }
                });

                const datos = response.data.results.bindings.map(fila => ({
                    ...fila,
                    fuente: { value: FUENTE_DBPEDIA }
                }));

                setResultado(datos);
            }
        } catch (error) {
            console.error("Error al consultar:", error);
            setResultado([]);
        } finally {
            setCargando(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') ejecutarBusqueda();
    };

    // ---------------- RENDER TABLA ----------------
    const renderTabla = () => {
        if (!resultado || resultado.length === 0) {
            return <p className="text-gray-600">{locales[idioma].noResults}</p>;
        }

        const columnas = Object.keys(resultado[0]);

        return (
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            {columnas.map((columna) => (
                                <th key={columna} className="border border-gray-300 px-4 py-2 bg-gray-200 text-gray-800 font-semibold">
                                    {columna.charAt(0).toUpperCase() + columna.slice(1)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {resultado.map((fila, index) => (
                            <tr key={index} className="odd:bg-white even:bg-gray-100 hover:bg-blue-50 transition-colors">
                                {columnas.map((columna) => {
                                    const valor = fila[columna]?.value || "-";

                                    const valorMostrar =
                                        columna === "fuente"
                                            ? valor
                                            : valor.includes('#')
                                                ? valor.split('#').pop()
                                                : valor.includes('/')
                                                    ? valor.split('/').pop()
                                                    : valor;
                                    
                                    return (
                                        <td key={columna} className="border border-gray-300 px-4 py-2 text-gray-700">
                                            {valorMostrar}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    // Ejemplos de búsqueda
    const ejemplosBusqueda = fuenteBusqueda === "local" 
        ? ["Cerveza", "Singani", "Vino", "Ron", "Whisky"]
        : ["Beer", "Wine", "Whiskey", "Vodka", "Tequila"];

    return (
        <div className="min-h-screen bg-gray-400 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{locales[idioma].title}</h1>

            <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md relative">
                
                {/* Selector de idioma */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <button
                        onClick={() => setIdioma("es")}
                        className={`w-10 h-10 rounded-full border-2 ${
                            idioma === "es" ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
                        } transition-all`}
                    >
                        <img src="src/imagenes/es.png" alt="Español" className="w-full h-full rounded-full" />
                    </button>

                    <button
                        onClick={() => setIdioma("en")}
                        className={`w-10 h-10 rounded-full border-2 ${
                            idioma === "en" ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
                        } transition-all`}
                    >
                        <img src="src/imagenes/en.png" alt="Inglés" className="w-full h-full rounded-full" />
                    </button>

                    <button
                        onClick={() => setIdioma("fr")}
                        className={`w-10 h-10 rounded-full border-2 ${
                            idioma === "fr" ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
                        } transition-all`}
                    >
                        <img src="src/imagenes/fr.png" alt="Francés" className="w-full h-full rounded-full" />
                    </button>
                </div>

                <br /><br />

                {/* Selector de fuente */}
                <div className="mb-6 flex gap-4 items-center">
                    <span className="font-semibold text-gray-700">Buscar en:</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value="local"
                            checked={fuenteBusqueda === "local"}
                            onChange={(e) => setFuenteBusqueda(e.target.value)}
                            className="w-4 h-4"
                        />
                        <span>Ontología Local (Bebidas Bolivia)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value="dbpedia"
                            checked={fuenteBusqueda === "dbpedia"}
                            onChange={(e) => setFuenteBusqueda(e.target.value)}
                            className="w-4 h-4"
                        />
                        <span>DBpedia (Conocimiento Mundial)</span>
                    </label>
                </div>

                {/* Descripción */}
                <p className="text-gray-700 mb-4">{locales[idioma].description}</p>

                {/* Ejemplos rápidos */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Ejemplos rápidos:</p>
                    <div className="flex gap-2 flex-wrap">
                        {ejemplosBusqueda.map((ejemplo) => (
                            <button
                                key={ejemplo}
                                onClick={() => setTerminoBusqueda(ejemplo)}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-sm transition-colors"
                            >
                                {ejemplo}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Buscador */}
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={terminoBusqueda}
                        onChange={(e) => setTerminoBusqueda(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={locales[idioma].searchPlaceholder}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={ejecutarBusqueda}
                        disabled={cargando || !terminoBusqueda.trim()}
                        className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {cargando ? locales[idioma].loading : locales[idioma].searchButton}
                    </button>
                </div>

                {/* Resultados */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        {locales[idioma].result}
                        {resultado && resultado.length > 0 && (
                            <span className="text-sm font-normal text-gray-500 ml-2">
                                ({resultado.length} encontrados)
                            </span>
                        )}
                    </h2>

                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 overflow-auto max-h-96">
                        {cargando ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                <span className="ml-3 text-gray-600">{locales[idioma].loading}</span>
                            </div>
                        ) : resultado === null ? (
                            <p className="text-gray-500">{locales[idioma].noSearchYet}</p>
                        ) : (
                            renderTabla()
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
