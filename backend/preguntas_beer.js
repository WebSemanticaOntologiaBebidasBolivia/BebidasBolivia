// // preguntas_beer.js

// const PREFIXES = `
// PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
// PREFIX owl: <http://www.w3.org/2002/07/owl#>
// PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
// PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
// PREFIX beer: <http://ontologia.beer.org#>
// `;

// const preguntas_beer = [
//   {
//     id: "b1",
//     label: {
//       es: "¿Cuáles son los estilos de cerveza definidos en la ontología?",
//       en: "Which beer styles are defined in the ontology?",
//       fr: "Quels styles de bière sont définis dans l'ontologie?",
//       pt: "Quais estilos de cerveja estão definidos na ontologia?",
//       it: "Quali stili di birra sono definiti nell'ontologia?",
//     },
//     query: `${PREFIXES}
// SELECT ?style ?label
// WHERE {
//   ?style rdfs:subClassOf beer:BeerStyle .
//   OPTIONAL { ?style rdfs:label ?label }
// }`,
//   },
//   {
//     id: "b2",
//     label: {
//       es: "¿Qué cervezas tienen un ABV superior al 8%?",
//       en: "Which beers have an ABV above 8%?",
//       fr: "Quelles bières ont un ABV supérieur à 8%?",
//       pt: "Quais cervejas têm um ABV acima de 8%?",
//       it: "Quali birre hanno un ABV superiore all'8%?",
//     },
//     query: `${PREFIXES}
// SELECT ?beer ?label ?abv
// WHERE {
//   ?beer rdf:type beer:Beer ;
//         beer:hasABV ?abv ;
//         rdfs:label ?label .
//   FILTER(?abv > 8)
// }`,
//   },
//   {
//     id: "b3",
//     label: {
//       es: "¿Qué ingredientes principales se utilizan en las cervezas?",
//       en: "Which main ingredients are used in beers?",
//       fr: "Quels ingrédients principaux sont utilisés dans les bières?",
//       pt: "Quais ingredientes principais são usados nas cervejas?",
//       it: "Quali ingredienti principali sono usati nelle birre?",
//     },
//     query: `${PREFIXES}
// SELECT DISTINCT ?ingredient ?label
// WHERE {
//   ?beer rdf:type beer:Beer ;
//         beer:hasIngredient ?ingredient .
//   OPTIONAL { ?ingredient rdfs:label ?label }
// }`,
//   },
//   {
//     id: "b4",
//     label: {
//       es: "¿Qué cervezas se producen en Alemania?",
//       en: "Which beers are produced in Germany?",
//       fr: "Quelles bières sont produites en Allemagne?",
//       pt: "Quais cervejas são produzidas na Alemanha?",
//       it: "Quali birre sono prodotte in Germania?",
//     },
//     query: `${PREFIXES}
// SELECT ?beer ?label
// WHERE {
//   ?beer rdf:type beer:Beer ;
//         beer:producedIn beer:Germany ;
//         rdfs:label ?label .
// }`,
//   },
//   {
//     id: "b5",
//     label: {
//       es: "¿Qué cervezas se clasifican como Lager?",
//       en: "Which beers are classified as Lager?",
//       fr: "Quelles bières sont classées comme Lager?",
//       pt: "Quais cervejas são classificadas como Lager?",
//       it: "Quali birre sono classificate come Lager?",
//     },
//     query: `${PREFIXES}
// SELECT ?beer ?label
// WHERE {
//   ?beer rdf:type beer:Lager ;
//         rdfs:label ?label .
// }`,
//   },
//   {
//     id: "b6",
//     label: {
//       es: "¿Qué cervezas se elaboran con lúpulo Cascade?",
//       en: "Which beers are brewed with Cascade hops?",
//       fr: "Quelles bières sont brassées avec du houblon Cascade?",
//       pt: "Quais cervejas são produzidas com lúpulo Cascade?",
//       it: "Quali birre sono prodotte con il luppolo Cascade?",
//     },
//     query: `${PREFIXES}
// SELECT ?beer ?label
// WHERE {
//   ?beer rdf:type beer:Beer ;
//         beer:hasIngredient beer:CascadeHop ;
//         rdfs:label ?label .
// }`,
//   },
//   {
//     id: "b7",
//     label: {
//       es: "¿Qué cervezas se producen en cervecerías artesanales?",
//       en: "Which beers are produced in craft breweries?",
//       fr: "Quelles bières sont produites dans des brasseries artisanales?",
//       pt: "Quais cervejas são produzidas em cervejarias artesanais?",
//       it: "Quali birre sono prodotte in birrifici artigianali?",
//     },
//     query: `${PREFIXES}
// SELECT ?beer ?label ?brewery
// WHERE {
//   ?brewery rdf:type beer:CraftBrewery ;
//            beer:produces ?beer .
//   ?beer rdfs:label ?label .
// }`,
//   },
//   {
//     id: "b8",
//     label: {
//       es: "¿Qué cervezas se clasifican como Ale?",
//       en: "Which beers are classified as Ale?",
//       fr: "Quelles bières sont classées comme Ale?",
//       pt: "Quais cervejas são classificadas como Ale?",
//       it: "Quali birre sono classificate come Ale?",
//     },
//     query: `${PREFIXES}
// SELECT ?beer ?label
// WHERE {
//   ?beer rdf:type beer:Ale ;
//         rdfs:label ?label .
// }`,
//   },
//   {
//     id: "b9",
//     label: {
//       es: "¿Qué cervezas tienen sabor afrutado?",
//       en: "Which beers have a fruity flavor?",
//       fr: "Quelles bières ont une saveur fruitée?",
//       pt: "Quais cervejas têm sabor frutado?",
//       it: "Quali birre hanno un sapore fruttato?",
//     },
//     query: `${PREFIXES}
// SELECT ?beer ?label
// WHERE {
//   ?beer rdf:type beer:Beer ;
//         beer:hasFlavor beer:Fruity ;
//         rdfs:label ?label .
// }`,
//   },
//   {
//     id: "b10",
//     label: {
//       es: "¿Qué cervezas se producen en Bélgica?",
//       en: "Which beers are produced in Belgium?",
//       fr: "Quelles bières sont produites en Belgique?",
//       pt: "Quais cervejas são produzidas na Bélgica?",
//       it: "Quali birre sono prodotte in Belgio?",
//     },
//     query: `${PREFIXES}
// SELECT ?beer ?label
// WHERE {
//   ?beer rdf:type beer:Beer ;
//         beer:producedIn beer:Belgium ;
//         rdfs:label ?label .
// }`,
//   },
// ];

// module.exports = preguntas_beer;

// preguntas_beer.js (versión esquema)

const PREFIXES = `
PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl:  <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>
PREFIX beer: <https://rdf.ag/o/beer#>
`;

const preguntas_beer = [
  {
    id: "b1",
    label: {
      es: "¿Qué clases existen en la ontología de cerveza?",
      en: "Which classes exist in the beer ontology?",
      fr: "Quelles classes existent dans l'ontologie de la bière?",
      pt: "Quais classes existem na ontologia da cerveja?",
      it: "Quali classi esistono nell'ontologia della birra?",
    },
    query: `${PREFIXES}
SELECT ?class ?label
WHERE {
  ?class a owl:Class .
  OPTIONAL { ?class rdfs:label ?label }
}
ORDER BY ?label ?class`,
  },
  {
    id: "b2",
    label: {
      es: "¿Cuáles son las subclases de BeerStyle?",
      en: "Which subclasses of BeerStyle exist?",
      fr: "Quelles sous-classes de BeerStyle existent?",
      pt: "Quais subclasses de BeerStyle existem?",
      it: "Quali sottoclassi di BeerStyle esistono?",
    },
    query: `${PREFIXES}
SELECT ?style ?label
WHERE {
  ?style rdfs:subClassOf beer:BeerStyle .
  OPTIONAL { ?style rdfs:label ?label }
}
ORDER BY ?label ?style`,
  },
  {
    id: "b3",
    label: {
      es: "¿Qué propiedades de objeto están definidas?",
      en: "Which object properties are defined?",
      fr: "Quelles propriétés d'objet sont définies?",
      pt: "Quais propriedades de objeto estão definidas?",
      it: "Quali proprietà oggetto sono definite?",
    },
    query: `${PREFIXES}
SELECT ?prop ?label ?domain ?range
WHERE {
  ?prop a owl:ObjectProperty .
  OPTIONAL { ?prop rdfs:label ?label }
  OPTIONAL { ?prop rdfs:domain ?domain }
  OPTIONAL { ?prop rdfs:range  ?range  }
}
ORDER BY ?label ?prop`,
  },
  {
    id: "b4",
    label: {
      es: "¿Qué propiedades de datos están definidas?",
      en: "Which datatype properties are defined?",
      fr: "Quelles propriétés de données sont définies?",
      pt: "Quais propriedades de dados estão definidas?",
      it: "Quali proprietà di dato sono definite?",
    },
    query: `${PREFIXES}
SELECT ?prop ?label ?domain ?range
WHERE {
  ?prop a owl:DatatypeProperty .
  OPTIONAL { ?prop rdfs:label ?label }
  OPTIONAL { ?prop rdfs:domain ?domain }
  OPTIONAL { ?prop rdfs:range  ?range  }
}
ORDER BY ?label ?prop`,
  },
  {
    id: "b5",
    label: {
      es: "¿Qué recursos tienen etiquetas (rdfs:label)?",
      en: "Which resources have labels (rdfs:label)?",
      fr: "Quels ressources ont des étiquettes (rdfs:label)?",
      pt: "Quais recursos possuem rótulos (rdfs:label)?",
      it: "Quali risorse hanno etichette (rdfs:label)?",
    },
    query: `${PREFIXES}
SELECT ?s ?label
WHERE {
  ?s rdfs:label ?label .
}
LIMIT 200`,
  },
  {
    id: "b6",
    label: {
      es: "¿Qué clases están directamente bajo beer:Beer?",
      en: "Which classes are directly under beer:Beer?",
      fr: "Quelles classes sont directement sous beer:Beer?",
      pt: "Quais classes estão diretamente sob beer:Beer?",
      it: "Quali classi sono direttamente sotto beer:Beer?",
    },
    query: `${PREFIXES}
SELECT ?sub ?label
WHERE {
  ?sub rdfs:subClassOf beer:Beer .
  OPTIONAL { ?sub rdfs:label ?label }
}
ORDER BY ?label ?sub`,
  },
  {
    id: "b7",
    label: {
      es: "¿Qué dominios y rangos tienen las propiedades relacionadas a estilo?",
      en: "What domains and ranges do style-related properties have?",
      fr: "Quels domaines et portées ont les propriétés liées au style?",
      pt: "Quais domínios e alcances têm as propriedades relacionadas ao estilo?",
      it: "Quali domini e range hanno le proprietà legate allo stile?",
    },
    query: `${PREFIXES}
SELECT ?prop ?label ?domain ?range
WHERE {
  ?prop a owl:ObjectProperty .
  FILTER( regex(str(?prop), "style|Style", "i") )
  OPTIONAL { ?prop rdfs:label ?label }
  OPTIONAL { ?prop rdfs:domain ?domain }
  OPTIONAL { ?prop rdfs:range  ?range  }
}
ORDER BY ?label ?prop`,
  },
  {
    id: "b8",
    label: {
      es: "¿Qué propiedades parecen relacionadas a ingredientes o lúpulo?",
      en: "Which properties seem related to ingredients or hops?",
      fr: "Quelles propriétés semblent liées aux ingrédients ou au houblon?",
      pt: "Quais propriedades parecem relacionadas a ingredientes ou lúpulo?",
      it: "Quali proprietà sembrano legate agli ingredienti o al luppolo?",
    },
    query: `${PREFIXES}
SELECT DISTINCT ?prop ?label
WHERE {
  ?prop a owl:ObjectProperty .
  OPTIONAL { ?prop rdfs:label ?label }
  FILTER( regex(str(?prop), "ingredient|hop|hops|malt", "i") ||
          regex(str(?label), "ingredient|hop|hops|malt", "i") )
}
ORDER BY ?label ?prop`,
  },
  {
    id: "b9",
    label: {
      es: "¿Hay propiedades que indiquen país/origen?",
      en: "Are there properties indicating country/origin?",
      fr: "Existe-t-il des propriétés indiquant le pays/l'origine?",
      pt: "Há propriedades que indiquem país/origem?",
      it: "Ci sono proprietà che indicano paese/origine?",
    },
    query: `${PREFIXES}
SELECT DISTINCT ?prop ?label
WHERE {
  ?prop a owl:ObjectProperty .
  OPTIONAL { ?prop rdfs:label ?label }
  FILTER( regex(str(?prop), "country|origin|madeIn|producedIn", "i") ||
          regex(str(?label), "country|origin|made in|produced in", "i") )
}
ORDER BY ?label ?prop`,
  },
  {
    id: "b10",
    label: {
      es: "¿Qué individuos existen en el grafo (primeros 100)?",
      en: "Which individuals exist in the graph (first 100)?",
      fr: "Quels individus existent dans le graphe (100 premiers)?",
      pt: "Quais indivíduos existem no grafo (primeiros 100)?",
      it: "Quali individui esistono nel grafo (primi 100)?",
    },
    query: `${PREFIXES}
SELECT ?s ?type
WHERE {
  ?s a ?type .
}
LIMIT 100`,
  },
];

module.exports = preguntas_beer;
