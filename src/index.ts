import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { swagger } from '@elysiajs/swagger';

import hrplatformRoutesDev from "./routes/hr_platform_dev";
import hrplatformRoutesProd from "./routes/hr_platform_prod";

const BASE_PATH = process.env.BASE_PATH || '';

const app = new Elysia()
  .use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
  }))
  .use(swagger({ path: `${BASE_PATH}/swagger` }))
  .use(hrplatformRoutesDev)
  .use(hrplatformRoutesProd)
  .get(`${BASE_PATH}/`, ({ redirect }) => {
      return redirect(`${BASE_PATH}/swagger`)
  })
  .listen(process.env.PORT || 4100);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
