import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { swagger } from '@elysiajs/swagger';

import hrplatformRoutes from "./routes/hr_platform";

const app = new Elysia()
.use(cors({
  origin: '*',
  methods: ['GET','POST'],
}))
.use(swagger())
.use(hrplatformRoutes)
.listen(3210);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
