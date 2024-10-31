# Proyecto de Todo App

## 1. Descripción

Este proyecto es una aplicación de Todo construida con **Next.js**, con una API backend en **NestJS** que maneja autenticación y gestión de usuarios y tareas. La aplicación permite crear, editar, eliminar y visualizar tareas (todos) con distintos estados, y cuenta con autenticación mediante **JWT** para proteger las rutas de perfil y otras funcionalidades.

## 2. Instrucciones de Configuración

### Requisitos Previos

- **Node.js** >= 16
- **npm** o **yarn**
- **PostgreSQL** (o cualquier otra base de datos configurada en el entorno)

### Configuración del Backend (NestJS)

1. Clonar el repositorio y acceder al directorio del backend:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd todo-app/backend
   ```

2. Instalar dependencias del backend:

   ```bash
    npm install
   ```

3. Crear un archivo .env en el directorio raíz del backend con la configuración de entorno requerida:

   ```makefile
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_base_de_datos
    JWT_SECRET=secreto_para_jwt
   ```

4. Iniciar el backend:

   ```bash
    npm run start:dev
   ```

   Esto levantará el servidor en http://localhost:3001/api.

### Configuración del Frontend (Next.js)

1. Ir al directorio del frontend:

   ```bash
   cd ../frontend
   ```

2. Instalar dependencias del frontend:

   ```bash
    npm install
   ```

3. Configurar la URL del backend en el frontend (si no es http://localhost:3001/api, ajustar los endpoints en los archivos de servicios o hooks que manejen las solicitudes HTTP).

4. Ejecutar el frontend:

   ```bash
    npm run dev
   ```

   Esto levantará el servidor en http://localhost:3000.

### Rutas Clave

- /auth: Para autenticarse y registrar nuevos usuarios.
- /profile: Perfil del usuario y gestión de tareas (protegido con JWT).

## 3. Explicación Técnica

Next + TypeScript: Utilizamos Next con TypeScript en el frontend para asegurar el tipado estático, ayudando a evitar errores en tiempo de compilación y mejorando la calidad del código.

Next.js: Optamos por Next.js para gestionar el enrutado y server-side rendering (SSR), mejorando la carga inicial y la experiencia de usuario.

NestJS en el backend: NestJS fue elegido por su arquitectura modular y su soporte de TypeScript nativo, lo que facilita la organización del código, la inyección de dependencias y el manejo de middleware como la autenticación.

Autenticación con JWT: Para mantener el backend seguro y simplificar la gestión de sesiones, usamos tokens JWT, que se almacenan en el sessionStorage del navegador. Esto permite asegurar rutas específicas en el frontend (por ejemplo, /profile), verificando el token en cada petición.

Base de Datos y ORM: PostgreSQL fue la base de datos seleccionada, usando TypeORM en NestJS para gestionar las entidades y migraciones. Esto permite escribir queries en TypeScript y aprovechar la relación entre las entidades User y Todo.
