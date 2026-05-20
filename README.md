# Fastify + Drizzle ORM API

API REST con **Fastify**, **Drizzle ORM** y **PostgreSQL** (Supabase).

## Estructura

```
src/
├── db/
│   ├── index.ts          # Conexión a PostgreSQL + Drizzle
│   └── schema.ts         # Definición de tablas (Drizzle)
├── schemas/
│   ├── user.schema.ts    # Validación Zod para usuarios
│   └── item.schema.ts    # Validación Zod para items
├── models/
│   ├── user.model.ts     # CRUD de usuarios
│   └── item.model.ts     # CRUD de items
├── services/
│   ├── user.service.ts   # Lógica de negocio + validación (usuarios)
│   └── item.service.ts   # Lógica de negocio + validación (items)
├── controllers/
│   ├── user.controller.ts # Request/response de usuarios
│   └── item.controller.ts # Request/response de items
├── routes/
│   ├── user.routes.ts    # Rutas de usuarios
│   └── item.routes.ts    # Rutas de items
├── lib/
│   └── errors.ts         # Clase ServiceError compartida
└── index.ts              # Entry point del servidor
```

## Endpoints

### Usuarios

| Método | Ruta           | Descripción        |
|--------|----------------|--------------------|
| GET    | `/health`      | Health check       |
| GET    | `/users`       | Listar usuarios    |
| GET    | `/users/:id`   | Obtener usuario    |
| POST   | `/users`       | Crear usuario      |
| PUT    | `/users/:id`   | Actualizar usuario |
| DELETE | `/users/:id`   | Eliminar usuario   |

### Items

| Método | Ruta           | Descripción        |
|--------|----------------|--------------------|
| GET    | `/items`       | Listar items       |
| GET    | `/items/:id`   | Obtener item       |
| POST   | `/items`       | Crear item         |
| PUT    | `/items/:id`   | Actualizar item    |
| DELETE | `/items/:id`   | Eliminar item      |

## Esquema de la base de datos

```sql
users (id, name, email, created_at)
items (id, name, description, price, user_id -> users.id, created_at)
```

## Swagger

La documentación interactiva está disponible en `/docs` una vez que el servidor está corriendo.

## Comandos

```bash
npm run dev          # Iniciar servidor en desarrollo
npm run build        # Compilar TypeScript
npm run start        # Iniciar servidor en producción
npm run db:generate  # Generar migraciones
npm run db:push      # Sincronizar schema con la DB
npm run db:studio    # Abrir Drizzle Studio
```

## Variables de Entorno

Crear un archivo `.env` en la raíz:

```env
DATABASE_URL="postgresql://..."
PORT=3000
```
