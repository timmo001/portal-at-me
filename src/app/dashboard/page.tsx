import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/server";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) notFound();

  const dashboards = await api.dashboard.listDashboards(userId);

  void api.dashboard.listDashboards.prefetch(userId);

  console.log({ dashboards });

  return (
    <>
      <section className="flex min-h-64 min-w-full flex-col items-center justify-center gap-12 bg-gradient-to-b from-slate-900 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {/* TODO: Animate this like a keyboard typing to show the user's first name, if avaliable */}
          Portal<span className="text-indigo-600">@</span>Me
        </h1>
      </section>
      <section className="flex flex-col items-center gap-2">
        <Link href="/dashboard/create">
          <Button variant="default" size="lg">
            <Plus size={24} />
            Create New
          </Button>
        </Link>
      </section>
      <section className="grid grid-cols-1 items-center gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dashboards.map((dashboard) => (
          <Link key={dashboard.id} href={`/dashboard/${dashboard.id}`}>
            <Card className="h-48 w-72">
              <CardHeader>
                <CardTitle>{dashboard.name}</CardTitle>
                <CardDescription>{dashboard.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </>
  );
}
