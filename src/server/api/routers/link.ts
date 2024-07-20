import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { links } from "~/server/db/schema";

export const linkRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        url: z.string().url(),
        dashboardId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(links).values({
        title: input.title,
        url: input.url,
        dashboardId: input.dashboardId,
      });
    }),
});
