// preguntas_wine.js

const PREFIXES = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX vin: <http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#>
PREFIX food: <http://www.w3.org/TR/2003/PR-owl-guide-20031209/food#>
`;

const preguntas_wine = [
  {
    id: "w1",
    label: {
      es: "¿Cuáles son los tipos de vino definidos en la ontología?",
      en: "Which wine types are defined in the ontology?",
      fr: "Quels types de vin sont définis dans l'ontologie?",
      pt: "Quais tipos de vinho estão definidos na ontologia?",
      it: "Quali tipi di vino sono definiti nell'ontologia?",
    },
    query: `${PREFIXES}
SELECT ?wineClass ?label
WHERE {
  ?wineClass rdfs:subClassOf vin:Wine .
  OPTIONAL { ?wineClass rdfs:label ?label }
}`,
  },
  {
    id: "w2",
    label: {
      es: "¿Qué variedades de uva están asociadas a vinos blancos?",
      en: "Which grape varieties are associated with White Wines?",
      fr: "Quelles variétés de raisin sont associées aux vins blancs?",
      pt: "Quais variedades de uva estão associadas aos Vinhos Brancos?",
      it: "Quali varietà di uva sono associate ai Vini Bianchi?",
    },
    query: `${PREFIXES}
SELECT ?grape
WHERE {
  vin:WhiteWine rdfs:subClassOf ?restriction .
  ?restriction owl:onProperty vin:madeFromGrape ;
               owl:hasValue ?grape .
}`,
  },
  {
    id: "w3",
    label: {
      es: "¿Qué colores de vino están definidos?",
      en: "Which wine colors are defined?",
      fr: "Quelles couleurs de vin sont définies?",
      pt: "Quais cores de vinho estão definidas?",
      it: "Quali colori di vino sono definiti?",
    },
    query: `${PREFIXES}
SELECT ?color
WHERE {
  vin:WineColor owl:oneOf ?list .
  ?list rdf:rest*/rdf:first ?color .
}`,
  },
  {
    id: "w4",
    label: {
      es: "¿Qué vinos se producen en la región de Burdeos?",
      en: "Which wines are produced in the Bordeaux region?",
      fr: "Quels vins sont produits dans la région de Bordeaux?",
      pt: "Quais vinhos são produzidos na região de Bordeaux?",
      it: "Quali vini sono prodotti nella regione di Bordeaux?",
    },
    query: `${PREFIXES}
SELECT ?wine
WHERE {
  ?wine rdfs:subClassOf vin:Bordeaux .
}`,
  },
  {
    id: "w5",
    label: {
      es: "¿Qué vinos tienen cuerpo completo (Full)?",
      en: "Which wines have Full body?",
      fr: "Quels vins ont un corps complet (Full)?",
      pt: "Quais vinhos têm corpo completo (Full)?",
      it: "Quali vini hanno corpo pieno (Full)?",
    },
    query: `${PREFIXES}
SELECT ?wine
WHERE {
  ?wine rdfs:subClassOf [
    owl:onProperty vin:hasBody ;
    owl:hasValue vin:Full
  ] .
}`,
  },
  {
    id: "w6",
    label: {
      es: "¿Qué vinos se caracterizan por ser dulces?",
      en: "Which wines are characterized as Sweet?",
      fr: "Quels vins sont caractérisés comme doux?",
      pt: "Quais vinhos são caracterizados como doces?",
      it: "Quali vini sono caratterizzati come dolci?",
    },
    query: `${PREFIXES}
SELECT ?wine
WHERE {
  ?wine rdfs:subClassOf [
    owl:onProperty vin:hasSugar ;
    owl:hasValue vin:Sweet
  ] .
}`,
  },
  {
    id: "w7",
    label: {
      es: "¿Qué vinos se producen en la región de Sancerre?",
      en: "Which wines are produced in the Sancerre region?",
      fr: "Quels vins sont produits dans la région de Sancerre?",
      pt: "Quais vinhos são produzidos na região de Sancerre?",
      it: "Quali vini sono prodotti nella regione di Sancerre?",
    },
    query: `${PREFIXES}
SELECT ?wine
WHERE {
  ?wine rdfs:subClassOf [
    owl:onProperty vin:locatedIn ;
    owl:hasValue vin:SancerreRegion
  ] .
}`,
  },
  {
    id: "w8",
    label: {
      es: "¿Qué vinos se elaboran con la uva Zinfandel?",
      en: "Which wines are made from Zinfandel grape?",
      fr: "Quels vins sont élaborés à partir du raisin Zinfandel?",
      pt: "Quais vinhos são feitos da uva Zinfandel?",
      it: "Quali vini sono fatti con l'uva Zinfandel?",
    },
    query: `${PREFIXES}
SELECT ?wine
WHERE {
  ?wine rdfs:subClassOf [
    owl:onProperty vin:madeFromGrape ;
    owl:hasValue vin:ZinfandelGrape
  ] .
}`,
  },
  {
    id: "w9",
    label: {
      es: "¿Qué vinos se producen en Portugal?",
      en: "Which wines are produced in Portugal?",
      fr: "Quels vins sont produits au Portugal?",
      pt: "Quais vinhos são produzidos em Portugal?",
      it: "Quali vini sono prodotti in Portogallo?",
    },
    query: `${PREFIXES}
SELECT ?wine
WHERE {
  ?wine rdfs:subClassOf [
    owl:onProperty vin:locatedIn ;
    owl:hasValue vin:PortugalRegion
  ] .
}`,
  },
  {
    id: "w10",
    label: {
      es: "¿Qué vinos se elaboran con Sauvignon Blanc?",
      en: "Which wines are made from Sauvignon Blanc?",
      fr: "Quels vins sont élaborés avec du Sauvignon Blanc?",
      pt: "Quais vinhos são feitos com Sauvignon Blanc?",
      it: "Quali vini sono fatti con Sauvignon Blanc?",
    },
    query: `${PREFIXES}
SELECT ?wine
WHERE {
  ?wine rdfs:subClassOf [
    owl:onProperty vin:madeFromGrape ;
    owl:hasValue vin:SauvignonBlancGrape
  ] .
}`,
  },
];

module.exports = preguntas_wine;
