# Electric Meatball Server

TypeScript/Express server for managing chat threads, reusable "meatballs" (assistant profiles), and OpenAI-backed chat responses. Data is stored locally in SQLite via `better-sqlite3`.

## Requirements

- Node.js 18+
- npm
- An OpenAI API key

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root. You can copy `.envExample` and adjust the values:

```env
DATABASE_NAME=em.db
HOST=localhost
PORT=3000
OPENAI_API_KEY=your-openai-api-key
```

### Environment Variables

- `DATABASE_NAME`: SQLite database file path.
- `HOST`: Interface the Express server binds to.
- `PORT`: Port the Express server listens on.
- `OPENAI_API_KEY`: Required for `/api/v1/chat/send`.

## Database Initialization

Run both steps before starting the server on a new database:

```bash
npm run init_db
npm run migrate
```

This order matters:

- `npm run init_db` creates the base tables.
- `npm run migrate` applies schema changes from `src/migrations/migrationList.ts`.

The current migration adds:

- `meatballs`
- `chat_threads.meatball_id`
- `chat_threads.model_name`

If you skip migrations, chat thread and meatball features will not match the schema the server expects.

## Running the Server

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

When the server starts, it mounts routes under:

- `/api/v1/chat`
- `/api/v1/meatball`

Health check:

```http
GET /api/v1/heartbeat
```

## API Overview

### Chat Threads

Create a thread:

```http
POST /api/v1/chat/thread/create
Content-Type: application/json
```

```json
{
  "threadName": "Trip planner",
  "modelName": "gpt-5.5-2026-04-23"
}
```

List all threads:

```http
GET /api/v1/chat/thread/all
```

Get thread details, including saved chats:

```http
GET /api/v1/chat/thread/:id/detail
```

Update a thread:

```http
PATCH /api/v1/chat/thread/update
Content-Type: application/json
```

```json
{
  "id": "thread-uuid",
  "newThreadName": "Renamed thread",
  "newMeatballId": "meatball-uuid",
  "modelName": "gpt-5.5-2026-04-23"
}
```

Delete a thread and its chats:

```http
DELETE /api/v1/chat/thread/:id
```

List supported models:

```http
GET /api/v1/chat/model/list
```

### Chat

Send a message:

```http
POST /api/v1/chat/send
Content-Type: application/json
```

```json
{
  "threadId": "thread-uuid",
  "message": "Write a short release note for this feature.",
  "model": "ignored-by-current-server"
}
```

Notes:

- The current implementation uses the thread's stored `modelName`, not the `model` value in the request body.
- If a thread is linked to a meatball, its instructions are inserted into the system prompt.
- Responses are requested from the OpenAI Responses API and persisted to SQLite.

### Meatballs

A meatball is a reusable assistant profile with `name`, `description`, and `instructions`.

Create a meatball:

```http
POST /api/v1/meatball/create
Content-Type: application/json
```

```json
{
  "name": "Release Writer",
  "description": "Writes concise release notes.",
  "instructions": "Be concise. Prefer bullets for changes and risks."
}
```

Get all meatballs:

```http
GET /api/v1/meatball/list/all
```

Get one meatball:

```http
GET /api/v1/meatball/:id
```

Update a meatball:

```http
PATCH /api/v1/meatball/update
Content-Type: application/json
```

```json
{
  "id": "meatball-uuid",
  "name": "Release Writer v2",
  "description": "Updated description",
  "instructions": "Be concise and return Markdown."
}
```

Delete a meatball:

```http
DELETE /api/v1/meatball/:id
```

Deleting a meatball also clears any `chat_threads.meatball_id` references to it.

## Project Scripts

- `npm run dev`: Start the server with `ts-node`.
- `npm run build`: Compile TypeScript to `dist/`.
- `npm start`: Run the compiled server.
- `npm run init_db`: Create the initial SQLite tables.
- `npm run migrate`: Apply pending migrations.

## Development Notes

- The database is opened directly from `DATABASE_NAME` on startup.
- CORS and JSON body parsing are enabled globally.
- Server errors fall through to a generic `500` JSON response.
- Usage metrics from OpenAI responses are stored in `llm_datas`.
