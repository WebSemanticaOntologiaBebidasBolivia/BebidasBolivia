FROM stain/jena-fuseki

# Copia configuración y seguridad
COPY fuseki-base/configuration/config.ttl /fuseki/configuration/config.ttl
COPY fuseki-base/shiro.ini /fuseki/shiro.ini

# Copia tu ontología inicial directamente al dataset
COPY bebidasbolivia.ttl /fuseki/databases/bebidas/bebidasbolivia.ttl

EXPOSE 3030
CMD ["/jena-fuseki/fuseki-server", "--config", "/fuseki/configuration/config.ttl"]
