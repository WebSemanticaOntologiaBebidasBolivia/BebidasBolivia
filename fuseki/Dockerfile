FROM stain/jena-fuseki

# Copia tu configuración personalizada
COPY fuseki-base/ /fuseki

# Expón el puerto Fuseki por defecto
EXPOSE 3030

# Comando de arranque (opcional, ya lo tiene la imagen base)
CMD ["/jena-fuseki/fuseki-server"]
