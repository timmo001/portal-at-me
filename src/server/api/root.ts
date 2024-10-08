import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { dashboardRouter } from "~/server/api/routers/dashboard";
import { linkRouter } from "~/server/api/routers/link";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  dashboard: dashboardRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.link.all();
 *       ^? Link[]
 */
export const createCaller = createCallerFactory(appRouter);
