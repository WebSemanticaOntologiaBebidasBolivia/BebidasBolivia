// preguntas.js

const PREFIXES = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://ontologia.bebidasbolivia.org#>
`;

const preguntas = [
    {
        id: "q1",
        label: {
            es: "¿Qué TipoDeBebida tiene la mayor DemandaPromedio en el departamento de Oruro durante la festividad de Carnaval de Oruro?",
            en: "Which BeverageType has the highest AverageDemand in Oruro during the Carnival?",
            pt: "Qual TipoDeBebida tem a maior DemandaMédia em Oruro durante o Carnaval?",
            fr: "Quel TypeDeBoisson a la plus grande DemandeMoyenne à Oruro pendant le Carnaval?",
            it: "Quale TipoDiBevanda ha la maggiore DomandaMedia a Oruro durante il Carnevale?",
        },
        query: `${PREFIXES}
SELECT ?tipoBebida ?label (SUM(?demanda) AS ?totalDemanda)
WHERE {
  ?dem rdf:type ex:DemandaPromedio ;
       ex:seAsociaAEvento ex:CarnavalOruro ;
       ex:tieneDemanda ?demanda ;
       ex:paraProducto ?bebida .
  ?bebida rdf:type ?tipoBebida .
  ?tipoBebida rdfs:subClassOf* ex:BebidaAlcoholica ;
             rdfs:label ?label .
}
GROUP BY ?tipoBebida ?label
ORDER BY DESC(?totalDemanda)
LIMIT 1`,
    },
    {
        id: "q2",
        label: {
            es: "¿Cuáles son los Eventos próximos en La Paz que superan los 100000 asistentes?",
            en: "Which upcoming Events in La Paz exceed 100,000 attendees?",
            pt: "Quais são os Eventos próximos em La Paz que superam 100.000 participantes?",
            fr: "Quels sont les Événements à venir à La Paz qui dépassent 100 000 participants?",
            it: "Quali Eventi imminenti a La Paz superano i 100.000 partecipanti?",
        },
        query: `${PREFIXES}
SELECT ?evento ?label ?nombre ?asistentes
WHERE {
  ?evento rdf:type ?tipo .
  ?tipo rdfs:subClassOf* ex:Evento .
  ?evento ex:ocurreEn ex:LaPaz ;
          rdfs:label ?label .
  OPTIONAL { ?evento ex:tieneNombre ?nombre }
  OPTIONAL { ?evento ex:cantidadAsistentes ?asistentes }
  FILTER(?asistentes > 100000)
}`,

    },
    {
        id: "q3",
        label: {
            es: "¿Qué RangoDeEdad es el más probable consumidor de Cerveza en la región del Chaco?",
            en: "Which AgeRange is the most likely Beer consumer in the Chaco region?",
            pt: "Qual FaixaEtária é o consumidor mais provável de Cerveja na região do Chaco?",
            fr: "Quelle TrancheD'âge est le consommateur le plus probable de Bière dans la région du Chaco?",
            it: "Quale FasciaDiEtà è il consumatore più probabile di Birra nella regione del Chaco?",
        },
        query: `${PREFIXES}
SELECT ?rangoEdad ?label ?nombreDemografico
WHERE {
  ?cerveza rdf:type ?tipoCerveza .
  ?tipoCerveza rdfs:subClassOf* ex:Cerveza .
  ?cerveza ex:seConsumeEn ?dept ;
           ex:esFavorecidaPor ?rangoEdad .
  ?dept ex:perteneceARegion ex:Chaco .
  ?rangoEdad rdfs:label ?label .
  OPTIONAL { ?rangoEdad ex:nombreDemografico ?nombreDemografico }
}`,

    },
    {
        id: "q4",
        label: {
            es: "¿Cuál es el NivelSocioEconómico primario de los asistentes a la Fiesta de San Roque en Tarija?",
            en: "What is the primary SocioEconomicLevel of attendees at the San Roque Festival in Tarija?",
            pt: "Qual é o NívelSocioeconômico primário dos participantes da Festa de San Roque em Tarija?",
            fr: "Quel est le NiveauSocioÉconomique principal des participants à la Fête de San Roque à Tarija?",
            it: "Qual è il LivelloSocioEconomico primario dei partecipanti alla Festa di San Roque a Tarija?",
        },
        query: `${PREFIXES}
SELECT ?nivel ?label ?valor
WHERE {
  ?bebida ex:seAsociaAEvento ex:FiestaSanRoque ;
          ex:esFavorecidaPor ?nivel .
  ?nivel rdf:type ?tipoNivel ;
         rdfs:label ?label .
  ?tipoNivel rdfs:subClassOf* ex:NivelSocioEconomico .
  OPTIONAL { ?nivel ex:nivelDemografico ?valor }
}`,

    },
    {
        id: "q5",
        label: {
            es: "¿Qué TipoDeBebida muestra una caída de Ventas posterior a la Semana Santa?",
            en: "Which BeverageType shows a decline in Sales after Easter?",
            pt: "Qual TipoDeBebida mostra uma queda nas Vendas após a Semana Santa?",
            fr: "Quel TypeDeBoisson montre une baisse des Ventes après Pâques?",
            it: "Quale TipoDiBevanda mostra un calo delle Vendite dopo la Settimana Santa?",
        },
        query: `${PREFIXES}
SELECT ?tipoBebida ?label (SUM(?ventas) AS ?totalVentas)
WHERE {
  ?venta rdf:type ex:Ventas ;
         ex:periodo "Post-Semana-Santa" ;
         ex:asociadaAEvento ex:SemanaSanta ;
         ex:tieneVolumenVentas ?ventas ;
         ex:paraProducto ?bebida .
  ?bebida rdf:type ?tipoBebida .
  ?tipoBebida rdfs:subClassOf* ex:BebidaAlcoholica ;
             rdfs:label ?label .
}
GROUP BY ?tipoBebida ?label
ORDER BY ASC(?totalVentas)`,

    },
    {
        id: "q6",
        label: {
            es: "¿Cuáles son las Festividades Patronales que requieren un volumen de Whisky superior a 50,000 unidades en Cochabamba?",
            en: "Which Patronal Festivities require a Whisky volume above 50,000 units in Cochabamba?",
            pt: "Quais Festividades Padroeiras exigem um volume de Uísque superior a 50.000 unidades em Cochabamba?",
            fr: "Quelles Festivités Patronales nécessitent un volume de Whisky supérieur à 50 000 unités à Cochabamba?",
            it: "Quali Festività Patronali richiedono un volume di Whisky superiore a 50.000 unità a Cochabamba?",
        },
        query: `${PREFIXES}
SELECT ?festividad ?label ?nombre ?volumen
WHERE {
  ?festividad rdf:type ?tipoFest .
  ?tipoFest rdfs:subClassOf* ex:FestividadPatronal .
  ?festividad ex:ocurreEn ex:Cochabamba ;
              rdfs:label ?label .
  OPTIONAL { ?festividad ex:tieneNombre ?nombre }
  ?venta rdf:type ex:Ventas ;
         ex:asociadaAEvento ?festividad ;
         ex:paraProducto ?bebida ;
         ex:tieneVolumenVentas ?volumen .
  ?bebida rdf:type ?tipoBebida .
  ?tipoBebida rdfs:subClassOf* ex:Whisky .
  FILTER(?volumen > 50000)
}`,

    },
    {
        id: "q7",
        label: {
            es: "¿Qué TipoDeBebida se asocia principalmente al consumo durante Partidos de la Selección Nacional?",
            en: "Which BeverageType is mainly associated with consumption during National Team Matches?",
            pt: "Qual TipoDeBebida está principalmente associado ao consumo durante Jogos da Seleção Nacional?",
            fr: "Quel TypeDeBoisson est principalement associé à la consommation lors des Matchs de l'Équipe Nationale?",
            it: "Quale TipoDiBevanda è principalmente associato al consumo durante le Partite della Nazionale?",
        },
        query: `${PREFIXES}
SELECT ?tipoBebida ?label (COUNT(?bebida) AS ?conteo)
WHERE {
  ?bebida ex:seAsociaAEvento ex:PartidoSeleccion ;
          rdf:type ?tipoBebida .
  ?tipoBebida rdfs:subClassOf* ex:BebidaAlcoholica ;
             rdfs:label ?label .
}
GROUP BY ?tipoBebida ?label
ORDER BY DESC(?conteo)
LIMIT 1`,

    },
    {
        id: "q8",
        label: {
            es: "¿Qué PropiedadOrganoléptica (ej. Dulzura) es preferida en el departamento de Beni?",
            en: "Which OrganolepticProperty (e.g., Sweetness) is preferred in the department of Beni?",
            pt: "Qual Propriedade Organoléptica (ex.: Doçura) é preferida no departamento de Beni?",
            fr: "Quelle Propriété Organoleptique (ex. Douceur) est préférée dans le département du Beni?",
            it: "Quale Proprietà Organolettica (es. Dolcezza) è preferita nel dipartimento di Beni?",
        },
        query: `${PREFIXES}
SELECT ?propiedad ?label ?valor
WHERE {
  ?bebida ex:seConsumeEn ex:Beni ;
          ex:tienePropiedad ?propiedad .
  ?propiedad rdf:type ?tipoProp ;
             rdfs:label ?label .
  ?tipoProp rdfs:subClassOf* ex:PropiedadOrganoleptica .
  OPTIONAL { ?propiedad ?atributo ?valor }
  FILTER(isLiteral(?valor))
}`,

    },
    {
        id: "q9",
        label: {
            es: "¿Cuál es el Distribuidor con mayor cobertura en el Altiplano boliviano?",
            en: "Which Distributor has the widest coverage in the Bolivian Altiplano?",
            pt: "Qual Distribuidor tem a maior cobertura no Altiplano boliviano?",
            fr: "Quel Distributeur a la plus grande couverture dans l'Altiplano bolivien?",
            it: "Quale Distributore ha la maggiore copertura nell'Altiplano boliviano?",
        },
        query: `${PREFIXES}
SELECT ?distribuidor ?label (COUNT(?dept) AS ?cobertura)
WHERE {
  ?distribuidor rdf:type ?tipoDist .
  ?tipoDist rdfs:subClassOf* ex:Distribuidor .
  ?distribuidor ex:esDominanteEn ?dept ;
               rdfs:label ?label .
  ?dept ex:perteneceARegion ex:Altiplano .
}
GROUP BY ?distribuidor ?label
ORDER BY DESC(?cobertura)
LIMIT 1`,

    },
    {
        id: "q10",
        label: {
            es: "¿Qué CanalDeVenta (ej. Supermercado, Discoteca) domina las ventas de Ron en Pando?",
            en: "Which SalesChannel (e.g., Supermarket, Nightclub) dominates Rum sales in Pando?",
            pt: "Qual CanalDeVenda (ex.: Supermercado, Discoteca) domina as vendas de Rum em Pando?",
            fr: "Quel CanalDeVente (ex. Supermarché, Discothèque) domine les ventes de Rhum à Pando?",
            it: "Quale CanaleDiVendita (es. Supermercato, Discoteca) domina le vendite di Rum a Pando?",
        },
        query: `${PREFIXES}
SELECT ?canal ?label (SUM(?volumen) AS ?totalVentas)
WHERE {
  ?venta rdf:type ex:Ventas ;
         ex:paraProducto ?ron ;
         ex:canalVenta ?canal ;
         ex:tieneVolumenVentas ?volumen .
  ?ron rdf:type ?tipoRon .
  ?tipoRon rdfs:subClassOf* ex:Ron .
  ?ron ex:seConsumeEn ex:Pando .
  ?canal rdfs:label ?label .
}
GROUP BY ?canal ?label
ORDER BY DESC(?totalVentas)
LIMIT 1`,

    },
    {
        id: "q11",
        label: {
            es: "¿Existe una correlación entre el Clima promedio de Oruro y el consumo de Singani?",
            en: "Is there a correlation between Oruro's average Climate and Singani consumption?",
            pt: "Existe uma correlação entre o Clima médio de Oruro e o consumo de Singani?",
            fr: "Existe-t-il une corrélation entre le climat moyen d'Oruro et la consommation de Singani?",
            it: "Esiste una correlazione tra il clima medio di Oruro e il consumo di Singani?",
        },
        query: `${PREFIXES}
SELECT ?clima ?temp ?bebida ?label
WHERE {
  ex:Oruro ex:tieneClima ?clima .
  OPTIONAL { ?clima ex:temperaturaPromedio ?temp }
  ?bebida rdf:type ?tipo .
  ?tipo rdfs:subClassOf* ex:Singani .
  ?bebida ex:seConsumeEn ex:Oruro .
  ?bebida rdfs:label ?label .
}`,

    },
    {
        id: "q12",
        label: {
            es: "¿Qué AcontecimientoExterno (ej. Elecciones Presidenciales) ha mostrado históricamente un aumento en la venta de Espumantes?",
            en: "Which ExternalOccurrence (e.g., Presidential Elections) has historically shown an increase in Sparkling Wine sales?",
            pt: "Qual Acontecimento Externo (ex.: Eleições Presidenciais) mostrou historicamente um aumento nas vendas de Espumantes?",
            fr: "Quel Événement Externe (ex. Élections présidentielles) a historiquement montré une hausse des ventes de vins mousseux?",
            it: "Quale Evento Esterno (es. Elezioni presidenziali) ha mostrato storicamente un aumento nelle vendite di spumanti?",
        },
        query: `${PREFIXES}
SELECT ?evento ?label ?nombre ?volumen
WHERE {
  ?evento rdf:type ?tipoEvt .
  ?tipoEvt rdfs:subClassOf* ex:AcontecimientoExterno .
  OPTIONAL { ?evento ex:tieneNombre ?nombre }
  ?venta rdf:type ex:Ventas ;
         ex:asociadaAEvento ?evento ;
         ex:paraProducto ?espumante ;
         ex:tieneVolumenVentas ?volumen .
  ?espumante rdf:type ?tipoEsp .
  ?tipoEsp rdfs:subClassOf* ex:VinoEspumante .
  ?evento rdfs:label ?label .
}
ORDER BY DESC(?volumen)
LIMIT 1`,

    },
    {
        id: "q13",
        label: {
            es: "¿Cuáles son las Marcas de Vino que compiten directamente en el rango de precios Medio (10–25 USD)?",
            en: "Which Wine Brands compete directly in the Medium price range (10–25 USD)?",
            pt: "Quais Marcas de Vinho competem diretamente na faixa de preço Média (10–25 USD)?",
            fr: "Quelles Marques de Vin rivalisent directement dans la gamme de prix Moyenne (10–25 USD)?",
            it: "Quali Marche di Vino competono direttamente nella fascia di prezzo Media (10–25 USD)?",
        },
        query: `${PREFIXES}
SELECT ?vino ?label ?marca ?min ?max
WHERE {
  ?vino rdf:type ?tipoVino .
  ?tipoVino rdfs:subClassOf* ex:VinoTinto .
  OPTIONAL { ?vino ex:nombreMarca ?marca }
  OPTIONAL { ?vino ex:rangoPrecioMin ?min }
  OPTIONAL { ?vino ex:rangoPrecioMax ?max }
  FILTER(?min >= 10 && ?max <= 25)
  ?vino rdfs:label ?label .
}`,

    },
    {
        id: "q14",
        label: {
            es: "¿Qué TipoDeBebida tiene mayor potencial de crecimiento entre el demográfico Generación Z en Bolivia?",
            en: "Which BeverageType has the greatest growth potential among Generation Z in Bolivia?",
            pt: "Qual TipoDeBebida tem maior potencial de crescimento entre a Geração Z na Bolívia?",
            fr: "Quel TypeDeBoisson a le plus grand potentiel de croissance parmi la Génération Z en Bolivie?",
            it: "Quale TipoDiBevanda ha il maggiore potenziale di crescita tra la Generazione Z in Bolivia?",
        },
        query: `${PREFIXES}
SELECT ?bebida ?label ?marca ?tipo
WHERE {
  ?bebida rdf:type ?tipo .
  ?tipo rdfs:subClassOf* ex:BebidaAlcoholica .
  OPTIONAL { ?bebida ex:nombreMarca ?marca }
  ?bebida ex:esFavorecidaPor ex:R18_24_GenZ .
  ?bebida rdfs:label ?label .
}`,

    },
    {
        id: "q15",
        label: {
            es: "¿Qué RestricciónLegal afecta la promoción de Licores Fuertes en días de Censo?",
            en: "Which LegalRestriction affects the promotion of Strong Liquors on Census days?",
            pt: "Qual RestriçãoLegal afeta a promoção de Bebidas Fortes em dias de Censo?",
            fr: "Quelle RestrictionLégale affecte la promotion des Spiritueux Forts les jours de recensement?",
            it: "Quale RestrizioneLegale influisce sulla promozione dei Liquori Forti nei giorni di Censimento?",
        },
        query: `${PREFIXES}
SELECT ?restriccion ?label ?nombre ?bebida
WHERE {
  ?restriccion rdf:type ?tipoRes .
  ?tipoRes rdfs:subClassOf* ex:RestriccionLegal .
  OPTIONAL { ?restriccion ex:tieneNombre ?nombre }
  ?restriccion ex:aplicaABebida ?bebida .
  ?bebida rdf:type ?tipoBebida .
  FILTER(?tipoBebida IN (ex:Whisky, ex:Ron, ex:Singani))
  ?restriccion rdfs:label ?label .
}`,

    },
    {
        id: "q16",
        label: {
            es: "¿Cuál es el PresupuestoPromedio de marketing por Festividad Departamental?",
            en: "What is the AverageMarketingBudget per Departmental Festivity?",
            pt: "Qual é o Orçamento Médio de marketing por Festividade Departamental?",
            fr: "Quel est le BudgetMoyen de marketing par Festivité Départementale?",
            it: "Qual è il BudgetMedio di marketing per Festività Dipartimentale?",
        },
        query: `${PREFIXES}
SELECT ?festividad ?label ?nombre ?presupuesto
WHERE {
  ?festividad rdf:type ?tipoFest .
  ?tipoFest rdfs:subClassOf* ex:FestividadDepartamental .
  OPTIONAL { ?festividad ex:tieneNombre ?nombre }
  OPTIONAL { ?festividad ex:presupuestoMarketing ?presupuesto }
  ?festividad rdfs:label ?label .
}`,

    },
    {
        id: "q17",
        label: {
            es: "¿Qué PropiedadOrganoléptica (ej. Amargor) es más popular en Potosí durante el invierno?",
            en: "Which OrganolepticProperty (e.g., Bitterness) is most popular in Potosí during winter?",
            pt: "Qual Propriedade Organoléptica (ex.: Amargor) é mais popular em Potosí durante o inverno?",
            fr: "Quelle Propriété Organoleptique (ex. Amertume) est la plus populaire à Potosí en hiver?",
            it: "Quale Proprietà Organolettica (es. Amaro) è più popolare a Potosí durante l'inverno?",
        },
        query: `${PREFIXES}
SELECT ?propiedad ?label ?valor
WHERE {
  ?bebida rdf:type ?tipoBebida .
  ?tipoBebida rdfs:subClassOf* ex:BebidaAlcoholica .
  ?bebida ex:seConsumeEn ex:Potosi ;
          ex:esPopularEn ex:EstInvierno ;
          ex:tienePropiedad ?propiedad .
  ?propiedad rdf:type ?tipoProp .
  ?tipoProp rdfs:subClassOf* ex:PropiedadOrganoleptica .
  OPTIONAL { ?propiedad ?atributo ?valor }
  FILTER(isLiteral(?valor))
  ?propiedad rdfs:label ?label .
}`,

    },
    {
        id: "q18",
        label: {
            es: "¿Qué TipoDeVaso se recomienda para la degustación del Singani Casa Real?",
            en: "Which GlassType is recommended for tasting Singani Casa Real?",
            pt: "Qual TipoDeCopo é recomendado para degustar o Singani Casa Real?",
            fr: "Quel TypeDeVerre est recommandé pour la dégustation du Singani Casa Real?",
            it: "Quale TipoDiBicchiere è raccomandato per la degustazione del Singani Casa Real?",
        },
        query: `${PREFIXES}
SELECT ?vaso ?label ?nombre
WHERE {
  ex:CasaReal rdf:type ?tipoSingani .
  ?tipoSingani rdfs:subClassOf* ex:Singani .
  ex:CasaReal ex:seRecomiendaVaso ?vaso .
  ?vaso rdf:type ?tipoVaso .
  ?tipoVaso rdfs:subClassOf* ex:TipoDeVaso .
  OPTIONAL { ?vaso ex:tieneNombre ?nombre }
  ?vaso rdfs:label ?label .
}`,

    },
    {
        id: "q19",
        label: {
            es: "¿Cuál es el Índice de Preferencia de Vodka en comparación con Ginebra en Chuquisaca?",
            en: "What is the PreferenceIndex of Vodka compared to Gin in Chuquisaca?",
            pt: "Qual é o Índice de Preferência de Vodka em comparação com Gin em Chuquisaca?",
            fr: "Quel est l'Indice de Préférence de la Vodka par rapport au Gin à Chuquisaca?",
            it: "Qual è l'Indice di Preferenza della Vodka rispetto al Gin in Chuquisaca?",
        },
        query: `${PREFIXES}
SELECT ?bebida ?label ?marca ?tipo ?indice
WHERE {
  ?bebida rdf:type ?tipo .
  ?tipo rdfs:subClassOf* ex:BebidaAlcoholica .
  ?bebida ex:seConsumeEn ex:Chuquisaca ;
          ex:indicePreferencia ?indice .
  FILTER(?tipo IN (ex:Vodka, ex:Ginebra))
  OPTIONAL { ?bebida ex:nombreMarca ?marca }
  ?bebida rdfs:label ?label .
}`,

    },
    {
        id: "q20",
        label: {
            es: "¿Qué IngredienteBase se utiliza más frecuentemente en los Cócteles populares en Tarija?",
            en: "Which BaseIngredient is most frequently used in popular Cocktails in Tarija?",
            pt: "Qual Ingrediente Base é usado com mais frequência em Coquetéis populares em Tarija?",
            fr: "Quel Ingrédient de Base est le plus fréquemment utilisé dans les Cocktails populaires à Tarija?",
            it: "Quale Ingrediente Base è usato più frequentemente nei Cocktail popolari a Tarija?",
        },
        query: `${PREFIXES}
SELECT ?ingrediente ?label (COUNT(?coctel) AS ?frecuencia)
WHERE {
  ?coctel rdf:type ?tipoCoctel .
  ?tipoCoctel rdfs:subClassOf* ex:BebidaAlcoholica .
  ?coctel ex:seConsumeEn ex:Tarija ;
          ex:usaIngrediente ?ingrediente .
  ?ingrediente rdfs:label ?label .
}
GROUP BY ?ingrediente ?label
ORDER BY DESC(?frecuencia)
LIMIT 1`,

    },
    {
        id: "q21",
        label: {
            es: "¿Qué EstiloDeMúsica (ej. Folklore, Electrónica) se asocia con el mayor consumo de Cervezas Premium?",
            en: "Which MusicStyle (e.g., Folklore, Electronic) is associated with the highest consumption of Premium Beers?",
            pt: "Qual EstiloDeMúsica (ex.: Folclore, Eletrônica) está associado ao maior consumo de Cervejas Premium?",
            fr: "Quel StyleMusical (ex. Folklore, Électronique) est associé à la plus grande consommation de Bières Premium?",
            it: "Quale StileMusicale (es. Folklore, Elettronica) è associato al maggior consumo di Birre Premium?",
        },
        query: `${PREFIXES}
SELECT ?musica ?label (COUNT(?cerveza) AS ?conteo)
WHERE {
  ?cerveza rdf:type ?tipoCerveza .
  ?tipoCerveza rdfs:subClassOf* ex:CervezaArtesanal .
  ?cerveza ex:esPremium "true"^^xsd:boolean ;
           ex:seAsociaConMusica ?musica .
  ?musica rdfs:label ?label .
}
GROUP BY ?musica ?label
ORDER BY DESC(?conteo)
LIMIT 1`,

    },
    {
        id: "q22",
        label: {
            es: "¿Cuáles son las Reglas de Maridaje recomendadas para el Vino Tinto boliviano?",
            en: "Which PairingRules are recommended for Bolivian Red Wine?",
            pt: "Quais são as Regras de Harmonização recomendadas para o Vinho Tinto boliviano?",
            fr: "Quelles Règles d'Accord sont recommandées pour le Vin Rouge bolivien?",
            it: "Quali Regole di Abbinamento sono raccomandate per il Vino Rosso boliviano?",
        },
        query: `${PREFIXES}
SELECT ?regla ?label ?nombre ?vino
WHERE {
  ?regla ex:aplicaABebida ?vino .
  OPTIONAL { ?regla ex:tieneNombre ?nombre }
  ?vino rdf:type ?tipoVino .
  ?tipoVino rdfs:subClassOf* ex:VinoTinto .
  ?regla rdfs:label ?label .
}`,

    },
    {
        id: "q23",
        label: {
            es: "¿Qué AcontecimientoExterno (ej. Elecciones 2025) puede ser usado para una campaña de Espumantes?",
            en: "Which ExternalOccurrence (e.g., Elections 2025) can be used for a Sparkling Wine campaign?",
            pt: "Qual Acontecimento Externo (ex.: Eleições 2025) pode ser usado para uma campanha de Espumantes?",
            fr: "Quel Événement Externe (ex. Élections 2025) peut être utilisé pour une campagne de Vins Mousseux?",
            it: "Quale Evento Esterno (es. Elezioni 2025) può essere usato per una campagna di Spumanti?",
        },
        query: `${PREFIXES}
SELECT ?evento ?label ?nombre
WHERE {
  ?campaña rdf:type ?tipoCamp .
  ?tipoCamp rdfs:subClassOf* ex:CampañaPublicitaria .
  ?campaña ex:promociona ?espumante ;
           ex:seAsociaAAcontecimiento ?evento .
  ?espumante rdf:type ?tipoEsp .
  ?tipoEsp rdfs:subClassOf* ex:VinoEspumante .
  OPTIONAL { ?evento ex:tieneNombre ?nombre }
  ?evento rdfs:label ?label .
}`,

    },
    {
        id: "q24",
        label: {
            es: "¿En qué EstaciónDelAño se concentra el mayor consumo de Tragos Calientes?",
            en: "In which Season is the highest consumption of Hot Drinks concentrated?",
            pt: "Em qual Estação do Ano se concentra o maior consumo de Bebidas Quentes?",
            fr: "Dans quelle Saison de l'Année se concentre la plus grande consommation de Boissons Chaudes?",
            it: "In quale Stagione dell'Anno si concentra il maggior consumo di Bevande Calde?",
        },
        query: `${PREFIXES}
SELECT ?estacion ?label (COUNT(?bebida) AS ?conteo)
WHERE {
  ?estacion rdf:type ?tipoEst .
  ?tipoEst rdfs:subClassOf* ex:EstacionDelAnio .
  OPTIONAL {
    ?bebida rdf:type ?tipoBebida .
    ?tipoBebida rdfs:subClassOf* ex:BebidaAlcoholica .
    ?bebida ex:temperaturaServicio "Caliente" ;
            ex:esPopularEn ?estacion .
  }
  ?estacion rdfs:label ?label .
}
GROUP BY ?estacion ?label
ORDER BY DESC(?conteo)
LIMIT 1`,

    },
    {
        id: "q25",
        label: {
            es: "¿Qué TipoDeBebida tiene un ABV promedio más alto en el mercado formal?",
            en: "Which BeverageType has the highest average ABV in the formal market?",
            pt: "Qual TipoDeBebida tem o ABV médio mais alto no mercado formal?",
            fr: "Quel TypeDeBoisson a le taux d'alcool moyen le plus élevé sur le marché formel?",
            it: "Quale TipoDiBevanda ha l'ABV medio più alto nel mercato formale?",
        },
        query: `${PREFIXES}
SELECT ?tipo ?label (AVG(?abv) AS ?promedioABV)
WHERE {
  ?bebida rdf:type ?tipo .
  ?tipo rdfs:subClassOf* ex:BebidaAlcoholica .
  ?bebida ex:esMercadoFormal "true"^^xsd:boolean ;
          ex:tieneABV ?abv .
  ?tipo rdfs:label ?label .
}
GROUP BY ?tipo ?label
ORDER BY DESC(?promedioABV)
LIMIT 1`,

    },
    {
        id: "q26",
        label: {
            es: "¿Cuál es el Coste de Producción promedio de una botella de Ron Nacional?",
            en: "What is the Average Production Cost of a bottle of National Rum?",
            pt: "Qual é o Custo Médio de Produção de uma garrafa de Rum Nacional?",
            fr: "Quel est le Coût Moyen de Production d'une bouteille de Rhum National?",
            it: "Qual è il Costo Medio di Produzione di una bottiglia di Rum Nazionale?",
        },
        query: `${PREFIXES}
SELECT ?ron ?label ?marca ?coste
WHERE {
  ?ron rdf:type ?tipoRon .
  ?tipoRon rdfs:subClassOf* ex:Ron .
  OPTIONAL { ?ron ex:nombreMarca ?marca }
  OPTIONAL { ?ron ex:costeProduccion ?coste }
  FILTER regex(str(?marca), "Ron Nacional", "i")
  ?ron rdfs:label ?label .
}`,

    },
    {
        id: "q27",
        label: {
            es: "¿Qué Departamento tiene la menor Densidad de Puntos de Venta para Licores Artesanales?",
            en: "Which Department has the lowest Density of Sales Points for Craft Liquors?",
            pt: "Qual Departamento tem a menor Densidade de Pontos de Venda para Licores Artesanais?",
            fr: "Quel Département a la plus faible Densité de Points de Vente pour les Liqueurs Artisanales?",
            it: "Quale Dipartimento ha la minore Densità di Punti Vendita per Liquori Artigianali?",
        },
        query: `${PREFIXES}
SELECT ?departamento ?label ?nombre (MIN(?densidad) AS ?menorDensidad)
WHERE {
  ?departamento rdf:type ?tipoDept .
  ?tipoDept rdfs:subClassOf* ex:Departamento .
  OPTIONAL { ?departamento ex:tieneNombre ?nombre }
  OPTIONAL { ?departamento ex:densidadPuntosVenta ?densidad }
  ?departamento rdfs:label ?label .
}
GROUP BY ?departamento ?label ?nombre
ORDER BY ASC(?menorDensidad)
LIMIT 1`,

    },
    {
        id: "q28",
        label: {
            es: "¿Qué TipoDeBebida (ej. Cerveza, Whisky) se beneficia más de las promociones de 2×1?",
            en: "Which BeverageType (e.g., Beer, Whisky) benefits most from 2×1 promotions?",
            pt: "Qual TipoDeBebida (ex.: Cerveja, Uísque) se beneficia mais das promoções de 2×1?",
            fr: "Quel TypeDeBoisson (ex. Bière, Whisky) bénéficie le plus des promotions 2×1?",
            it: "Quale TipoDiBevanda (es. Birra, Whisky) beneficia maggiormente dalle promozioni 2×1?",
        },
        query: `${PREFIXES}
SELECT ?tipo ?label (SUM(?volumen) AS ?totalPromocion)
WHERE {
  ?venta rdf:type ex:Ventas ;
         ex:tipoPromocion "2x1" ;
         ex:tieneVolumenVentas ?volumen ;
         ex:paraProducto ?bebida .
  ?bebida rdf:type ?tipo .
  ?tipo rdfs:subClassOf* ex:BebidaAlcoholica .
  ?tipo rdfs:label ?label .
}
GROUP BY ?tipo ?label
ORDER BY DESC(?totalPromocion)
LIMIT 1`,

    },
    {
        id: "q29",
        label: {
            es: "¿Qué CelebridadLocal tiene mayor afinidad con el público objetivo de Singani?",
            en: "Which LocalCelebrity has the greatest affinity with Singani's target audience?",
            pt: "Qual Celebridade Local tem maior afinidade com o público-alvo do Singani?",
            fr: "Quelle Célébrité Locale a la plus grande affinité avec le public cible du Singani?",
            it: "Quale Celebrità Locale ha la maggiore affinità con il pubblico target del Singani?",
        },
        query: `${PREFIXES}
SELECT ?celebridad ?label ?nombre
WHERE {
  ?singani rdf:type ?tipoSingani .
  ?tipoSingani rdfs:subClassOf* ex:Singani .
  ?singani ex:esFavorecidaPor ?celebridad .
  ?celebridad rdf:type ?tipoCel .
  ?tipoCel rdfs:subClassOf* ex:CelebridadLocal .
  OPTIONAL { ?celebridad ex:tieneNombre ?nombre }
  ?celebridad rdfs:label ?label .
}`,

    },
    {
        id: "q30",
        label: {
            es: "¿Cómo varían las Tendencias de Consumo de Bebidas Sin Alcohol antes y durante la Semana Santa?",
            en: "How do Consumption Trends of Non-Alcoholic Beverages vary before and during Holy Week?",
            pt: "Como variam as Tendências de Consumo de Bebidas Sem Álcool antes e durante a Semana Santa?",
            fr: "Comment varient les Tendances de Consommation de Boissons Non Alcoolisées avant et pendant la Semaine Sainte?",
            it: "Come variano le Tendenze di Consumo delle Bevande Analcoliche prima e durante la Settimana Santa?",
        },
        query: `${PREFIXES}
SELECT ?periodo (SUM(?demanda) AS ?totalDemanda)
WHERE {
  ?dem rdf:type ex:DemandaPromedio ;
       ex:seAsociaAEvento ex:SemanaSanta ;
       ex:paraProducto ?bebida ;
       ex:periodo ?periodo ;
       ex:tieneDemanda ?demanda .
  ?bebida rdf:type ?tipoBebida .
  ?tipoBebida rdfs:subClassOf* ex:BebidaSinAlcohol .
}
GROUP BY ?periodo
ORDER BY ASC(?periodo)`,

    },
    {
        id: "q31",
        label: {
            es: "¿Qué TipoDeEnvase (ej. Lata, Vidrio) es preferido para el consumo en Eventos Masivos?",
            en: "Which PackagingType (e.g., Can, Glass) is preferred for consumption at Mass Events?",
            pt: "Qual TipoDeEmbalagem (ex.: Lata, Vidro) é preferido para consumo em Eventos Massivos?",
            fr: "Quel Type d'Emballage (ex. Canette, Verre) est préféré pour la consommation lors des Événements Massifs?",
            it: "Quale TipoDiImballaggio (es. Lattina, Vetro) è preferito per il consumo negli Eventi di Massa?",
        },
        query: `${PREFIXES}
SELECT ?envase ?label ?nombre ?evento
WHERE {
  ?envase rdf:type ?tipoEnvase .
  ?tipoEnvase rdfs:subClassOf* ex:TipoDeEnvase .
  OPTIONAL { ?envase ex:tieneNombre ?nombre }
  OPTIONAL { ?envase ex:esPreferidoEn ?evento }
  ?evento rdf:type ?tipoEvt .
  ?tipoEvt rdfs:subClassOf* ex:EventoMasivo .
  ?envase rdfs:label ?label .
}`,

    },
    {
        id: "q32",
        label: {
            es: "¿Qué RestricciónLegal aplica a la venta de alcohol durante las horas de votación?",
            en: "Which LegalRestriction applies to alcohol sales during voting hours?",
            pt: "Qual RestriçãoLegal se aplica à venda de álcool durante o horário de votação?",
            fr: "Quelle RestrictionLégale s'applique à la vente d'alcool pendant les heures de vote?",
            it: "Quale RestrizioneLegale si applica alla vendita di alcol durante le ore di voto?",
        },
        query: `${PREFIXES}
SELECT ?restriccion ?label ?nombre ?descripcion
WHERE {
  ?restriccion rdf:type ?tipoRes .
  ?tipoRes rdfs:subClassOf* ex:RestriccionLegal .
  OPTIONAL { ?restriccion ex:tieneNombre ?nombre }
  OPTIONAL { ?restriccion ex:descripcion ?descripcion }
  ?restriccion ex:aplicaAEvento ex:Elecciones2025 .
  ?restriccion rdfs:label ?label .
}`,

    },
    {
        id: "q33",
        label: {
            es: "¿Qué TipoDeBebida es más común en la celebración del Día de la Madre?",
            en: "Which BeverageType is most common in Mother's Day celebrations?",
            pt: "Qual TipoDeBebida é mais comum na celebração do Dia das Mães?",
            fr: "Quel TypeDeBoisson est le plus courant lors de la célébration de la Fête des Mères?",
            it: "Quale TipoDiBevanda è più comune nella celebrazione della Festa della Mamma?",
        },
        query: `${PREFIXES}
SELECT ?bebida ?label ?marca ?tipo
WHERE {
  ?bebida ex:seAsociaAEvento ex:DiaDeLaMadre ;
          rdf:type ?tipo .
  ?tipo rdfs:subClassOf* ex:BebidaAlcoholica .
  OPTIONAL { ?bebida ex:nombreMarca ?marca }
  ?bebida rdfs:label ?label .
}`,

    },
    {
        id: "q34",
        label: {
            es: "¿Cuál es el Impacto de un aumento del impuesto específico en el precio final de la Ginebra Importada?",
            en: "What is the Impact of a specific tax increase on the final price of Imported Gin?",
            pt: "Qual é o Impacto de um aumento do imposto específico no preço final da Gin Importada?",
            fr: "Quel est l'Impact d'une hausse de la taxe spécifique sur le prix final du Gin Importé?",
            it: "Qual è l'Impatto di un aumento dell'imposta specifica sul prezzo finale del Gin Importato?",
        },
        query: `${PREFIXES}
SELECT ?bebida ?label ?marca ?impacto ?precio
WHERE {
  ?bebida rdf:type ?tipoGin .
  ?tipoGin rdfs:subClassOf* ex:Ginebra .
  OPTIONAL { ?bebida ex:nombreMarca ?marca }
  OPTIONAL { ?bebida ex:impactoImpuesto ?impacto }
  OPTIONAL { ?bebida ex:esPrecioPromedio ?precio }
  FILTER regex(str(?bebida), "GinebraImportada", "i")
  ?bebida rdfs:label ?label .
}`,

    },
    {
        id: "q35",
        label: {
            es: "¿Qué TipoDeBebida se debe priorizar en el inventario de Pando en el mes de Noviembre?",
            en: "Which BeverageType should be prioritized in Pando's inventory in November?",
            pt: "Qual TipoDeBebida deve ser priorizado no inventário de Pando em Novembro?",
            fr: "Quel TypeDeBoisson doit être priorisé dans l'inventaire de Pando en Novembre?",
            it: "Quale TipoDiBevanda deve essere prioritizzato nell'inventario di Pando a Novembre?",
        },
        query: `${PREFIXES}
SELECT ?bebida ?label ?marca ?volumen
WHERE {
  ?venta rdf:type ex:Ventas ;
         ex:periodo "Noviembre" ;
         ex:ocurreEnDepartamento ex:Pando ;
         ex:paraProducto ?bebida ;
         ex:tieneVolumenVentas ?volumen .
  OPTIONAL { ?bebida ex:nombreMarca ?marca }
  ?bebida rdfs:label ?label .
}
ORDER BY DESC(?volumen)
LIMIT 1`,

    },
];

module.exports = preguntas;
