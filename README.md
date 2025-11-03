# HR Bypass API

Elysia.js API server for HR Platform data access.

## Getting Started

To get started with this project:

```bash
bun install
bun run dev
```

The server will start on `http://localhost:4100`.

## Environment Variables

- `BASE_PATH`: Base path for all routes (default: empty string). Set to `/hr-platform` for proxy pass support.
- `API_URL_DEV`: Development API endpoint URL
- `API_KEY_DEV`: Development API key
- `API_URL_PROD`: Production API endpoint URL
- `API_KEY_PROD`: Production API key

## API Endpoints

- Swagger UI: `{BASE_PATH}/swagger`
- HR Platform Dev: `{BASE_PATH}/hr-platform-dev/*`
- HR Platform Prod: `{BASE_PATH}/hr-platform-prod/*`