# Motor de Búsqueda de Bebidas de Bolivia

Este proyecto permite explorar la ontología de bebidas de Bolivia mediante un frontend en Vite + HeroUI, un backend en Node.js/Express y un servidor Fuseki (Apache Jena) para consultas SPARQL.

## 🚀 Tecnologías utilizadas

- [Vite](https://vitejs.dev/guide/)
- [HeroUI](https://heroui.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)
- [Node.js](https://nodejs.org) + [Express](https://expressjs.com)
- [Apache Jena Fuseki](https://jena.apache.org/documentation/fuseki2/)
- [Docker](https://www.docker.com)

---

## 📂 Estructura del proyecto

```
WebSemantica-main/
├── frontend/   → Aplicación en Vite + HeroUI
├── backend/    → API en Node.js/Express
└── fuseki/     → Configuración y despliegue de Apache Jena Fuseki
```

---

## ⚡ Frontend (Vite + HeroUI)

### 1. Instalar dependencias

```bash
cd frontend
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `frontend` con el siguiente contenido:

```env
VITE_API_URL=http://localhost:3000
VITE_API_CONSULTAR=/consultar
VITE_API_PREGUNTAS=/api/preguntas
VITE_FUSEKI_ENDPOINT=http://localhost:3030
VITE_DEFAULT_LANG=es
```

### 3. Levantar servidor de desarrollo

```bash
npm run dev
```

El frontend quedará disponible en `http://localhost:5173`.

---

## ⚙️ Backend (Node.js/Express)

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```env
PORT=3000
FUSEKI_ENDPOINT=http://localhost:3030/bebidas/sparql
```

### 3. Levantar servidor

```bash
npm run dev
```

El backend quedará disponible en `http://localhost:3000`.

---

## 🗂 Fuseki (SPARQL Server con Docker)

### 1. Requisitos

Debes tener [Docker](https://docs.docker.com/get-docker/) instalado.

### 2. Construir la imagen

Desde la carpeta `fuseki`:

```bash
cd fuseki
docker build -t fuseki-bebidas .
```

### 3. Levantar el contenedor

```bash
docker run -p 3030:3030 fuseki-bebidas
```

Esto levantará Fuseki en `http://localhost:3030` con el dataset `/bebidas`.

---

## ✅ Flujo local recomendado

1. Inicia Fuseki con Docker y verifica que `/bebidas/sparql` responde.
2. Inicia el backend en `http://localhost:3000`.
3. Inicia el frontend en `http://localhost:5173`.
4. Abre el navegador y prueba las consultas desde la interfaz.

---

## 🧪 Consulta SPARQL mínima de prueba

```sparql
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?s ?p ?o
WHERE {
  ?s ?p ?o
}
LIMIT 10
```

Puedes probarla directamente en `http://localhost:3030/bebidas/sparql`.

---

## 📜 Licencia

Licensed under the MIT license.
