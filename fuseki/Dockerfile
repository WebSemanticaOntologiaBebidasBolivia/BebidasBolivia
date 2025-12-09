FROM stain/jena-fuseki

# Copia tu configuración personalizada
COPY fuseki-base/ /fuseki

# 🔧 Da permisos de escritura a Fuseki
RUN chmod -R 777 /fuseki

# Expón el puerto Fuseki por defecto
EXPOSE 3030

# Comando de arranque
CMD ["/jena-fuseki/fuseki-server"]
