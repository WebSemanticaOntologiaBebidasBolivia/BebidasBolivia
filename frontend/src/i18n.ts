// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: {
        appTitle: "Motor de Búsqueda de Bebidas en Bolivia",
        appDescription:
          "Explora la ontología de bebidas en Bolivia mediante consultas SPARQL o selecciona una de las 35 preguntas predefinidas para descubrir patrones de consumo, eventos y preferencias culturales.",
        inputPlaceholder: "Escribe tu consulta SPARQL aquí...",
        executeButton: "Ejecutar consulta",
        result: "Resultado:",
        noResults: "No hay resultados para mostrar.",
        tableLabel: "Resultados de consulta SPARQL",
        footer: {
          repo: "Repositorio",
          rights: "Todos los derechos reservados."
        },
        panelHint: "Al seleccionar esta pregunta, se cargará la consulta SPARQL en el panel izquierdo.",
        verPreguntas: "Ver preguntas",
        cerrar: "Cerrar"
      }
    },
    en: {
      translation: {
        appTitle: "Bolivia Beverage Search Engine",
        appDescription:
          "Explore the beverage ontology in Bolivia through SPARQL queries or select one of the 35 predefined questions to discover consumption patterns, events, and cultural preferences.",
        inputPlaceholder: "Write your SPARQL query here...",
        executeButton: "Execute query",
        result: "Result:",
        noResults: "No results to display.",
        tableLabel: "SPARQL query results",
        footer: {
          repo: "Repository",
          rights: "All rights reserved."
        },
        panelHint: "By selecting this question, the SPARQL query will be loaded in the left panel.",
        verPreguntas: "View questions",
        cerrar: "Close"
      }
    },
    fr: {
      translation: {
        appTitle: "Moteur de Recherche des Boissons en Bolivie",
        appDescription:
          "Explorez l'ontologie des boissons en Bolivie via des requêtes SPARQL ou sélectionnez l'une des 35 questions prédéfinies pour découvrir les habitudes de consommation, les événements et les préférences culturelles.",
        inputPlaceholder: "Écrivez votre requête SPARQL ici...",
        executeButton: "Exécuter la requête",
        result: "Résultat :",
        noResults: "Aucun résultat à afficher.",
        tableLabel: "Résultats de la requête SPARQL",
        footer: {
          repo: "Répertoire",
          rights: "Tous droits réservés."
        },
        panelHint: "En sélectionnant cette question, la requête SPARQL sera chargée dans le panneau de gauche.",
        verPreguntas: "Voir les questions",
        cerrar: "Fermer"
      }
    },
    pt: {
      translation: {
        appTitle: "Motor de Busca de Bebidas na Bolívia",
        appDescription:
          "Explore a ontologia de bebidas na Bolívia por meio de consultas SPARQL ou selecione uma das 35 perguntas predefinidas para descobrir padrões de consumo, eventos e preferências culturais.",
        inputPlaceholder: "Escreva sua consulta SPARQL aqui...",
        executeButton: "Executar consulta",
        result: "Resultado:",
        noResults: "Nenhum resultado para mostrar.",
        tableLabel: "Resultados da consulta SPARQL",
        footer: {
          repo: "Repositório",
          rights: "Todos os direitos reservados."
        },
        panelHint: "Ao selecionar esta pergunta, a consulta SPARQL será carregada no painel à esquerda.",
        verPreguntas: "Ver perguntas",
        cerrar: "Fechar"
      }
    },
    it: {
      translation: {
        appTitle: "Motore di Ricerca delle Bevande in Bolivia",
        appDescription:
          "Esplora l'ontologia delle bevande in Bolivia tramite query SPARQL o seleziona una delle 35 domande predefinite per scoprire modelli di consumo, eventi e preferenze culturali.",
        inputPlaceholder: "Scrivi qui la tua query SPARQL...",
        executeButton: "Esegui query",
        result: "Risultato:",
        noResults: "Nessun risultato da mostrare.",
        tableLabel: "Risultati della query SPARQL",
        footer: {
          repo: "Repository",
          rights: "Tutti i diritti riservati."
        },
        panelHint: "Selezionando questa domanda, la query SPARQL verrà caricata nel pannello a sinistra.",
        verPreguntas: "Vedi le domande",
        cerrar: "Chiudi"
      }
    }
  },
  lng: import.meta.env.VITE_DEFAULT_LANG || "es",
  fallbackLng: "es",
  interpolation: { escapeValue: false }
});

export default i18n;
