# Pushup_Backend



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

## Instalación

Clona mi repositorio, instala mi proyecto con npm

```bash
  git clone https://github.com/Raxont/template_examen.git
  npm i
```

Importar la base de datos del backup:

```javascript
npm run import
```

## Ejecución

Para ejecutar el codigo usa npm run

```bash
  npm run dev
  npm run start
```

## Variables de entorno

```javascript
SECRET_JWT_KEY
NODE_ENV

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
VITE_MONGO_DB_NAME=

GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

DISCORD_CLIENT_ID
DISCORD_CLIENT_SECRET
```



## Estructura de carpetas

```bash
│   .gitignore
│   astro.config.mjs
│   estructura_proyecto.txt
│   package.json
│   README.md
│   tailwind.config.mjs
│   tsconfig.json
├───api
│   │   server.cjs  
│   ├───controllers
│   │       paymentsController.cjs
│   │       productsController.cjs
│   │       requestsController.cjs
│   │       usuariosController.cjs
│   ├───dto
│   ├───fotosPerfil     
│   ├───infrastructure
│   │   ├───database
│   │   │       mongodb.cjs
│   │   └───middlewares
│   │       │   authMiddleware.cjs
│   │       │   errorHandling.cjs
│   │       │   googleAuth.cjs
│   │       │   rateLimit.cjs 
│   │       └───server
│   │               corsConfig.cjs
│   │               sessionConfig.cjs      
│   ├───model
│   ├───models
│   │       pagosModel.cjs
│   │       pedidosModel.cjs
│   │       productosModel.cjs
│   │       usuariosModel.cjs
│   ├───routes
│   │       paymentsRoutes.cjs
│   │       productsRoutes.cjs
│   │       requestsRoutes.cjs
│   │       usuariosRoutes.cjs  
│   ├───utils
│   │       jwtUtils.cjs 
│   └───validator
│           usuariosValidator.cjs 
└───src
    │   env.d.ts
    ├───components
    │       home.jsx
    │       login.jsx
    │       logout.jsx
    │       prductForm.jsx
    │       productDisplay.jsx
    │       register.jsx
    │       searchBar.jsx
    │       sessionChecker.jsx  
    ├───layouts
    │       HomeLayout.astro
    │       Layout.astro  
    ├───pages
    │       home.astro
    │       index.astro
    │       login.astro
    │       register.astro
    └───styles
            global.css
```



# Explicación de los Endpoints

## **Usuarios**

### 1. Obtener todos los usuarios

- **Método**: `GET`
- **URL**: `/v2/users/`
- **Descripción**: Recupera una lista de todos los usuarios registrados en el sistema. Este endpoint puede paginar los resultados si se implementa la funcionalidad.

### 2. Obtener un usuario por ID

- **Método**: `GET`
- **URL**: `/v2/users/:id`
- **Descripción**: Obtiene los detalles de un usuario específico utilizando su ID único.
- **Parámetros**:
  - `id`: ID del usuario a recuperar.

### 3. Crear un nuevo usuario

- **Método**: `POST`

- **URL**: `/v2/users`

- **Descripción**: Crea un nuevo usuario en el sistema. Se espera que el cuerpo de la solicitud contenga los datos necesarios como nombre, correo electrónico, contraseña, etc.

- **Cuerpo de la solicitud**:

  - Ejemplo:

    ```json
    {
      "id": "1234567890",
      "nombre": "camilo",
      "correo": "camilo@gmail.com",
      "password": "1234",
      "fotoPerfil": "camilo.jpg",
      "favoritos": [],
      "carritoCompras": []
    }
    ```

### 4. Actualizar un usuario

- **Método**: `PUT`

- **URL**: `/v2/users/:id`

- **Descripción**: Actualiza la información de un usuario existente. Los datos a actualizar se pasan en el cuerpo de la solicitud.

- **Parámetros**:

  - `id`: ID del usuario a actualizar.

- **Cuerpo de la solicitud**:

  - Ejemplo:

    ```json
    {
      "nombre": "camilos"
    }
    ```

### 5. Eliminar un usuario

- **Método**: `DELETE`
- **URL**: `/v2/users/:id`
- **Descripción**: Elimina un usuario del sistema usando su ID único.
- **Parámetros**:
  - `id`: _id del usuario a eliminar.

### 8. Actualiza la foto de perfil

- **Método**: `GET`
- **URL**: `/v2/users/upload-profile-picture`
- **Descripción**: Obtiene el archivo por la req.files y actualiza en la base de datos la foto y en el archivo de fotosPerfil del servidor.

## **Autenticación**

### 1. Iniciar sesión con Google

- **Método**: `GET`
- **URL**: `/v2/users/google`
- **Descripción**: Redirige al usuario a google para autenticarse. Una vez autenticado, el usuario será redirigido de vuelta al sitio con un token de sesión.

### 2. Iniciar sesión con cuenta local

- **Método**: `POST`

- **URL**: `/v2/users/loginAccount`

- **Descripción**: Inicia sesión utilizando un usuario registrado con correo electrónico o teléfono.

- **Cuerpo de la solicitud**:

  - Ejemplo:

    ```json
    {
      "user": "camilo",
      "password": "1234"
    }
    ```

### 5. Cerrar sesión

- **Método**: `POST`
- **URL**: `/v2/users/logout`
- **Descripción**: Cierra la sesión del usuario actual, invalidando su token de sesión.

### 6. Obtener la session

- **Método**: `GET`
- **URL**: `/v2/users/session-data`
- **Descripción**: Obtiene la sesión del usuario actual, con su id y su token de sesión.
- **Bearer:** Agregar token en el campo de Auth.

### 7. Verificar la session

- **Método**: `GET`
- **URL**: `/v2/users/session-check`
- **Descripción**: Verifica si existe una sesion en la web y envía un error si no existe.
- **Bearer:** Agregar token en el campo de Auth.

## Productos

### 1. Obtener todos los productos

- **Método**: `GET`
- **URL**: `/v2/products/`
- **Descripción**: Recupera una lista de todos los productos registrados en el sistema. Este endpoint puede paginar los resultados si se implementa la funcionalidad.


## Usado por:

Este proyecto puede ser usado por:
- Campuslands
