const PREFIXES = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbr: <http://dbpedia.org/resource/>
`;

const preguntas_dbpedia = [
  {
    id: "d1",
    label: {
      es: "¿Qué cervezas están registradas en DBpedia?",
      en: "Which beers are registered in DBpedia?",
      fr: "Quelles bières sont enregistrées dans DBpedia?",
      pt: "Quais cervejas estão registradas no DBpedia?",
      it: "Quali birre sono registrate in DBpedia?",
    },
    query: `${PREFIXES}
SELECT ?beer ?label
WHERE {
  ?beer a dbo:Beer ;
        rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d2",
    label: {
      es: "¿Qué eventos relacionados con cerveza existen?",
      en: "Which beer-related events exist?",
      fr: "Quels événements liés à la bière existent?",
      pt: "Quais eventos relacionados à cerveja existem?",
      it: "Quali eventi legati alla birra esistono?",
    },
    query: `${PREFIXES}
SELECT ?event ?label
WHERE {
  ?event a dbo:Event ;
         rdfs:label ?label .
  FILTER(regex(str(?label), "beer", "i"))
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d3",
    label: {
      es: "¿Qué países producen cerveza según DBpedia?",
      en: "Which countries produce beer according to DBpedia?",
      fr: "Quels pays produisent de la bière selon DBpedia?",
      pt: "Quais países produzem cerveja segundo o DBpedia?",
      it: "Quali paesi producono birra secondo DBpedia?",
    },
    query: `${PREFIXES}
SELECT DISTINCT ?country ?label
WHERE {
  ?beer a dbo:Beer ;
        dbo:country ?country .
  ?country rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d4",
    label: {
      es: "¿Qué cervecerías están registradas en DBpedia?",
      en: "Which breweries are registered in DBpedia?",
      fr: "Quelles brasseries sont enregistrées dans DBpedia?",
      pt: "Quais cervejarias estão registradas no DBpedia?",
      it: "Quali birrifici sono registrati in DBpedia?",
    },
    query: `${PREFIXES}
SELECT ?brewery ?label
WHERE {
  ?brewery a dbo:Brewery ;
           rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d5",
    label: {
      es: "¿Qué estilos de cerveza están definidos?",
      en: "Which beer styles are defined?",
      fr: "Quels styles de bière sont définis?",
      pt: "Quais estilos de cerveja estão definidos?",
      it: "Quali stili di birra sono definiti?",
    },
    query: `${PREFIXES}
SELECT ?style ?label
WHERE {
  ?style a dbo:BeerStyle ;
         rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d6",
    label: {
      es: "¿Qué cervezas tienen un ABV superior al 8%?",
      en: "Which beers have an ABV above 8%?",
      fr: "Quelles bières ont un ABV supérieur à 8%?",
      pt: "Quais cervejas têm um ABV acima de 8%?",
      it: "Quali birre hanno un ABV superiore all'8%?",
    },
    query: `${PREFIXES}
SELECT ?beer ?label ?abv
WHERE {
  ?beer a dbo:Beer ;
        dbo:alcoholByVolume ?abv ;
        rdfs:label ?label .
  FILTER(?abv > 0.08)
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d7",
    label: {
      es: "¿Qué cervezas se producen en Alemania?",
      en: "Which beers are produced in Germany?",
      fr: "Quelles bières sont produites en Allemagne?",
      pt: "Quais cervejas são produzidas na Alemanha?",
      it: "Quali birre sono prodotte in Germania?",
    },
    query: `${PREFIXES}
SELECT ?beer ?label
WHERE {
  ?beer a dbo:Beer ;
        dbo:country dbr:Germany ;
        rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d8",
    label: {
      es: "¿Qué cervezas se producen en Bélgica?",
      en: "Which beers are produced in Belgium?",
      fr: "Quelles bières sont produites en Belgique?",
      pt: "Quais cervejas são produzidas na Bélgica?",
      it: "Quali birre sono prodotte in Belgio?",
    },
    query: `${PREFIXES}
SELECT ?beer ?label
WHERE {
  ?beer a dbo:Beer ;
        dbo:country dbr:Belgium ;
        rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d9",
    label: {
      es: "¿Qué cervezas se producen en Estados Unidos?",
      en: "Which beers are produced in the United States?",
      fr: "Quelles bières sont produites aux États-Unis?",
      pt: "Quais cervejas são produzidas nos Estados Unidos?",
      it: "Quali birre sono prodotte negli Stati Uniti?",
    },
    query: `${PREFIXES}
SELECT ?beer ?label
WHERE {
  ?beer a dbo:Beer ;
        dbo:country dbr:United_States ;
        rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d10",
    label: {
      es: "¿Qué festivales de cerveza están registrados?",
      en: "Which beer festivals are registered?",
      fr: "Quels festivals de bière sont enregistrés?",
      pt: "Quais festivais de cerveja estão registrados?",
      it: "Quali festival della birra sono registrati?",
    },
    query: `${PREFIXES}
SELECT ?festival ?label
WHERE {
  ?festival a dbo:Festival ;
            rdfs:label ?label .
  FILTER(regex(str(?label), "beer", "i"))
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d11",
    label: {
      es: "¿Qué cervezas se clasifican como Lager?",
      en: "Which beers are classified as Lager?",
      fr: "Quelles bières sont classées comme Lager?",
      pt: "Quais cervejas são classificadas como Lager?",
      it: "Quali birre sono classificate come Lager?",
    },
    query: `${PREFIXES}
SELECT ?beer ?label
WHERE {
  ?beer a dbo:Beer ;
        dbo:style dbr:Lager ;
        rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d12",
    label: {
      es: "¿Qué cervezas se clasifican como Ale?",
      en: "Which beers are classified as Ale?",
      fr: "Quelles bières sont classées comme Ale?",
      pt: "Quais cervejas são classificadas como Ale?",
      it: "Quali birre sono classificate come Ale?",
    },
    query: `${PREFIXES}
SELECT ?beer ?label
WHERE {
  ?beer a dbo:Beer ;
        dbo:style dbr:Ale ;
        rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d13",
    label: {
      es: "¿Qué cervezas tienen sabor afrutado?",
      en: "Which beers have a fruity flavor?",
      fr: "Quelles bières ont une saveur fruitée?",
      pt: "Quais cervejas têm sabor frutado?",
      it: "Quali birre hanno un sapore fruttato?",
    },
    query: `${PREFIXES}
SELECT ?beer ?label
WHERE {
  ?beer a dbo:Beer ;
        dbo:flavor dbr:Fruity ;
        rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d14",
    label: {
      es: "¿Qué cervezas están asociadas a festivales?",
      en: "Which beers are associated with festivals?",
      fr: "Quelles bières sont associées à des festivals?",
      pt: "Quais cervejas estão associadas a festivais?",
      it: "Quali birre sono associate a festival?",
    },
    query: `${PREFIXES}
SELECT ?beer ?label ?festival
WHERE {
  ?festival a dbo:Festival ;
            dbo:relatedBeer ?beer .
  ?beer rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
  {
    id: "d15",
    label: {
      es: "¿Qué cervezas están vinculadas a ciudades específicas?",
      en: "Which beers are linked to specific cities?",
      fr: "Quelles bières sont liées à des villes spécifiques?",
      pt: "Quais cervejas estão vinculadas a cidades específicas?",
      it: "Quali birre sono collegate a città specifiche?",
    },
    query: `${PREFIXES}
SELECT ?beer ?label ?city
WHERE {
  ?beer a dbo:Beer ;
        dbo:city ?city ;
        rdfs:label ?label .
  FILTER(lang(?label) = "en")
}
LIMIT 50`,
  },
];

module.exports = preguntas_dbpedia;
