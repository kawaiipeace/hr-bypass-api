import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { swagger } from '@elysiajs/swagger';

import hrplatformRoutesDev from "./routes/hr_platform_dev";
import hrplatformRoutesProd from "./routes/hr_platform_prod";

const app = new Elysia()
  .use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
  }))
  .use(swagger())
  .use(hrplatformRoutesDev)
  .use(hrplatformRoutesProd)
  .get('/', ({ redirect }) => {
      return redirect('/swagger')
  })
  .listen(4100);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
