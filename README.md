# Pushup_Backend

Este proyecto es una aplicacion para actividades diarias que tiene como objetivo crear una herramienta eficiente y flexible que permita a los usuarios organizar, registrar, y seguir su progreso en diversas actividades cotidianas. Esto servirá como un sistema de gestión de tareas que incluye funcionalidades clave como el seguimiento de hábitos, establecimiento de metas, y generación de reportes de productividad. El enfoque principal es proporcionar a los usuarios una plataforma que les ayude a gestionar tanto sus tareas personales como profesionales, mejorando su organización y permitiendo un control detallado sobre su tiempo y prioridades.

Es necesario tener instalado mongoDB, mongo shell, las herramientas de mongoDB y usar Node,js con la version '23.0.0:

MongoDB:

```http
https://www.mongodb.com/try/download/community
```

Mongo Shell:

```http
https://www.mongodb.com/try/download/shell
```

Herramientas de mongoDB:

```http
https://www.mongodb.com/try/download/database-tools
```

Usar la version **23.0.0** de Node.js:

```bash
nvm install 23.0.0
nvm use 23.0.0
```

## Tecnologías usadas

**Server:** Node.js, Express.js, MongoDB, Passportjs, Swagger, Bcryptjs, Jsonwebtoken, 

## Instalación

Clona mi repositorio, instala mi proyecto con npm

```bash
git clone https://github.com/Raxont/Pushup_Backend.git
npm i
```

Importar la base de datos del backup:

```bash
node --run import
```

## Ejecución

Para ejecutar el codigo usa el siguiente comando:

```bash
node --run dev
```

## Variables de entorno

Crea un archivo .env en el archivo principal del proyecto y usa estas variables de entorno

```javascript
SECRET_JWT_KEY = "Everything you want to put here"
NODE_ENV="false"

VITE_HTTP_BACKEND
VITE_HTTP_FRONTEND

VITE_HOST
VITE_PORT_BACKEND
VITE_PORT_FRONTEND

VITE_MONGO_ACCESS
VITE_MONGO_USER
VITE_MONGO_PWD
VITE_MONGO_HOST
VITE_MONGO_PORT
VITE_MONGO_DB_NAME

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

## Estructura de carpetas

```bash
│   .env
│   .gitignore
│   app.cjs
│   package.json
│   README.md
│   
├───api
│   │   server.cjs
│   │   
│   ├───controllers
│   │       usuariosController.cjs
│   │       
│   ├───helpers
│   │   └───backup
│   │           activdades.json
│   │           categorias.json
│   │           colaboraciones.json
│   │           estadisticas.json
│   │           etiquetas.json
│   │           hitos.json
│   │           import.cjs
│   │           objetivos.json
│   │           recordatorios.json
│   │           reportes.json
│   │           usuarios.json
│   │           
│   ├───infrastructure
│   │   ├───database
│   │   │       mongodb.cjs
│   │   │       
│   │   └───middlewares
│   │       │   authMiddleware.cjs
│   │       │   errorHandling.cjs
│   │       │   googleAuth.cjs
│   │       │   rateLimit.cjs
│   │       │   
│   │       └───server
│   │               sessionConfig.cjs
│   │               swagger.cjs
│   │               
│   ├───models
│   │       usuariosModel.cjs
│   │       
│   ├───routes
│   │       usuariosRoutes.cjs
│   │       
│   └───utils
│           jwtUtils.cjs
```

## Endpoints

Si desea probar los endpoints con swagger usar la URL que se muestra al iniciar mi proyecto y tiene como nombre Documentación Swagger, ejemplo:

```web-idl
http://localhost:3001/api
```

O puede usarlo con otra api rest client de su preferencia con la URL que tiene como nombre Server corriendo, ejemplo:

```web-idl
http://localhost:3001
```

## Usado por:

Este proyecto puede ser usado por:
- Campuslands
