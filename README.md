# Biblioteca — Proyecto Integrador

Proyecto full stack: **React + Spring Boot + Hibernate + MySQL**. Es la evolución del
`PrestamoDeLibros.java` de tu repo `Practicas-JAVA`, ahora como una aplicación completa
de punta a punta. La idea es que lo vayas conectando a medida que el curso llegue a cada
tecnología — hoy mismo no vas a poder correr todo (todavía no has visto Spring ni
Hibernate), pero ya tienes el código real esperando.

## Qué tecnología cubre cada carpeta

| Carpeta      | Tecnología              | Tema del curso al que corresponde |
|--------------|--------------------------|------------------------------------|
| `backend/`   | Java 17 + Spring Boot     | Spring Boot                        |
| `backend/`   | Spring Data JPA           | Hibernate                          |
| `database/`  | SQL                       | MySQL                              |
| `frontend/`  | React + Vite              | React                              |
| `postman/`   | Colección de Postman      | Postman                            |

## Qué hace la aplicación

Un CRUD de libros con una regla de negocio simple: un libro se puede **prestar** (deja de
estar disponible y guarda la fecha) y **devolver** (vuelve a estar disponible). Es
deliberadamente simple — la idea es que la lógica de negocio no te distraiga mientras
aprendes cada pieza técnica.

## Cómo correrlo (cuando llegues a cada tema)

### 1. Base de datos (MySQL)
1. Instala MySQL si no lo tienes.
2. No necesitas correr `database/schema.sql` a mano — el backend crea la tabla solo
   (`spring.jpa.hibernate.ddl-auto=update`). El script está ahí solo como referencia y
   por si quieres insertar los datos de ejemplo manualmente.
3. Abre `backend/src/main/resources/application.properties` y cambia
   `spring.datasource.password` por tu contraseña real de MySQL.

### 2. Backend (Spring Boot)
```
cd backend
mvn spring-boot:run
```
Debería levantar en `http://localhost:8080`. Prueba `http://localhost:8080/api/libros`
en el navegador — deberías ver una lista vacía `[]` (o los libros de ejemplo si corriste
el `schema.sql`).

### 3. Probar la API con Postman
Importa `postman/Biblioteca-API.postman_collection.json` en Postman y prueba cada
endpoint antes de conectar el frontend. Así verificas que el backend funciona por su
cuenta.

### 4. Frontend (React)
```
cd frontend
npm install
npm run dev
```
Abre `http://localhost:5173`. Deberías poder agregar libros, prestarlos, devolverlos y
eliminarlos, viendo los cambios reflejados en tiempo real desde la base de datos.

## Endpoints de la API

| Método | Ruta                        | Qué hace                          |
|--------|------------------------------|-------------------------------------|
| GET    | `/api/libros`                | Lista todos los libros              |
| GET    | `/api/libros/{id}`           | Busca un libro por id               |
| POST   | `/api/libros`                | Crea un libro nuevo                 |
| PUT    | `/api/libros/{id}`           | Actualiza titulo/autor/isbn         |
| DELETE | `/api/libros/{id}`           | Elimina un libro                    |
| POST   | `/api/libros/{id}/prestar`   | Marca el libro como prestado        |
| POST   | `/api/libros/{id}/devolver`  | Marca el libro como disponible      |

## Cómo seguir avanzando

Este proyecto está pensado para crecer contigo. Ideas para cuando quieras extenderlo,
en orden sugerido:

1. **Validación y manejo de errores más fino** — ya hay una base (`@Valid`,
   `@ExceptionHandler`), pero puedes agregar más reglas (ISBN con formato válido, etc.)
2. **Autenticación** — cuando el curso lo cubra, agrega login para que solo usuarios
   registrados puedan prestar/devolver libros.
3. **Tests** — agrega tests con JUnit para el `LibroService`, y tests de componente en
   React con Vitest/React Testing Library.
4. **Despliegue** — sube el backend a algo como Railway o Render, el frontend a Vercel
   o Netlify, y la base de datos a PlanetScale o un MySQL administrado. Ahí sí tienes un
   link para poner en tu CV.
5. **Integración con IA** — el curso menciona ChatGPT; una idea simple es un endpoint
   que sugiera libros parecidos usando la API de OpenAI, para cuando quieras un
   diferencial extra.

## Nota sobre este repo

Este proyecto vive **separado** de `Practicas-JAVA` (ese sigue siendo tu repo de
ejercicios sueltos). Cuando lo subas a GitHub, dale un nombre propio como
`biblioteca-fullstack` — este es el que vas a poner primero en tu portafolio una vez
que esté funcionando de punta a punta.
