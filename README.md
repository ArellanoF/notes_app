
# Notes App

Aplicación de notas construida con **Laravel** (backend) y **React + TypeScript + Vite** (frontend).

## Comando Artisan personalizado

El comando [`App\Console\Commands\CreateNotesAppDatabase`](backend/app/Console/Commands/CreateNotesAppDatabase.php) (`php artisan db:create-notes-app`) inicializa la base de datos `notes_app`, crea la tabla `notes` y la inicializa con datos de muestra.

---


## Estructura del proyecto

```
backend/   # API RESTful en Laravel
frontend/  # SPA en React + TypeScript + Vite
```

---

## Backend (Laravel)

### Requisitos

- PHP >= 8.1
- Composer
- MySQL/MariaDB

### Instalación

1. Entra en la carpeta `backend`:

   ```sh
   cd backend
   ```

2. Instala las dependencias:

   ```sh
   composer install
   ```

3. Crea la base de datos y ejecuta migraciones y seeders con el comando personalizado:

   ```sh
   php artisan db:create-notes-app
   ```

4. Inicia el servidor de desarrollo:

   ```sh
   php artisan serve
   ```

La API estará disponible en `http://localhost:8000`.

---

## Frontend (React + TypeScript + Vite)

### Requisitos

- Node.js >= 18
- npm

### Instalación

1. Entra en la carpeta `frontend`:

   ```sh
   cd frontend
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Inicia la aplicación en modo desarrollo:

   ```sh
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:5173`.

---

## Licencia

MIT