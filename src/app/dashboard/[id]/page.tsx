import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import { api } from "~/trpc/server";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";

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
      <section className="w-lg container flex min-h-64 flex-col items-center justify-center">
        {dashboard.dashboardLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            <Card className="h-48 w-72">
              <CardHeader>
                <CardTitle>{link.title}</CardTitle>
              </CardHeader>
            </Card>
          </a>
        ))}
      </section>
    </>
  );
}
