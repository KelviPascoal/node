import { Router } from 'express';
import { photoRoutes } from './photo.routes';
import { sessionsRoutes } from './sessions.routes';
import { userRouter }  from './user.routes';

export const routes = Router();
routes.use("/users", userRouter)
routes.use("/auth", sessionsRoutes)
routes.use("/photos", photoRoutes)
