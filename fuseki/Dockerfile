FROM stain/jena-fuseki

# Copia configuración y ontología
COPY fuseki-base/configuration/config.ttl /fuseki/configuration/config.ttl
COPY fuseki-base/shiro.ini /fuseki/shiro.ini
COPY fuseki-base/databases/bebidas/bebidasbolivia.ttl /fuseki/databases/bebidas/bebidasbolivia.ttl

EXPOSE 3030
CMD ["/jena-fuseki/fuseki-server", "--config", "/fuseki/configuration/config.ttl"]
