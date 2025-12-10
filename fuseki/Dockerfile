FROM stain/jena-fuseki

# Configuración de Fuseki y seguridad
COPY fuseki-base/config.ttl /fuseki/config.ttl
COPY fuseki-base/shiro.ini  /fuseki/shiro.ini

# Ontologías/datasets (fuentes)
COPY bebidasbolivia.ttl     /fuseki/bebidasbolivia.ttl
COPY wine.rdf               /fuseki/wine.rdf
COPY beer.owl               /fuseki/beer.owl

# Exponer puerto
EXPOSE 3030

# Arranque con configuración declarativa
CMD ["/jena-fuseki/fuseki-server", "--config", "/fuseki/config.ttl"]
