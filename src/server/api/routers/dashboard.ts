import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { dashboards } from "~/server/db/schema";

export const dashboardRouter = createTRPCRouter({
  createDashboard: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(dashboards).values({
        name: input.name,
        description: input.description,
        userId: input.userId,
      });
    }),
  listDashboards: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.query.dashboards.findMany({
      where: eq(dashboards.userId, input),
      orderBy: [desc(dashboards.id)],
    });
  }),
  getDashboard: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.query.dashboards.findFirst({
      where: eq(dashboards.id, input),
      with: { dashboardLinks: true },
    });
  }),
  updateDashboard: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        description: z.string().optional(),
        search: z.enum(dashboards.search.enumValues).optional(),
        showName: z.boolean(),
        showDescription: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(dashboards)
        .set({
          name: input.name,
          description: input.description,
          search: input.search,
          showName: input.showName,
          showDescription: input.showDescription,
        })
        .where(eq(dashboards.id, input.id));
    }),
});
