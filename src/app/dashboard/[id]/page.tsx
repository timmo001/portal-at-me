import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Link } from "lucide-react";

import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";

import { CreateLink } from "~/components/create-link";

export default async function Dashboard({
  params,
}: {
  params: { id: number };
}) {
  const { userId } = auth();
  if (!userId) notFound();

  console.log({ params });
  const dashboard = await api.dashboard.getDashboard(Number(params.id));

  void api.dashboard.getDashboard.prefetch(Number(params.id));

  // Ensure the dashboard exists and belongs to the user
  if (!dashboard || dashboard.userId !== userId) notFound();

  return (
    <>
      <section className="w-lg container flex min-h-64 flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {dashboard.name}
        </h1>
        <h2 className="text-xl font-semibold text-gray-500">
          {dashboard.description}
        </h2>
      </section>
      <section className="grid grid-cols-1 items-center gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboard.dashboardLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="flex h-48 w-72 flex-col items-center justify-center gap-2"
              variant="outline"
            >
              <Link size={24} />
              <span className="text-center text-xl font-medium">
                {link.title}
              </span>
            </Button>
          </a>
        ))}
        <CreateLink dashboardId={dashboard.id} />
      </section>
    </>
  );
}
