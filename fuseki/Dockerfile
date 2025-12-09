FROM stain/jena-fuseki

# Copia configuración y seguridad
COPY fuseki-base/config.ttl /fuseki/config.ttl
COPY fuseki-base/shiro.ini /fuseki/shiro.ini

# Copia tu ontología a una ruta accesible
COPY bebidasbolivia.ttl /fuseki/bebidasbolivia.ttl

EXPOSE 3030
CMD ["/jena-fuseki/fuseki-server", "--config", "/fuseki/config.ttl"]
