import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { extractOpenGraph } from "@devmehq/open-graph-extractor";

import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";

import { CreateLink } from "~/components/create-link";
import { SearchBar } from "~/components/search-bar";

type OpenGraphResponse = { ogImage?: { url?: string } } | null;

async function fetchOpenGraph(url: string): Promise<OpenGraphResponse> {
  try {
    const res = await fetch(url);
    return await extractOpenGraph(await res.text());
  } catch (error) {
    console.error("Error fetching Open Graph data", error);
    return null;
  }
}

async function mergeOpenGraphImages(
  links: Array<{ id: number; url: string; title: string }>,
): Promise<
  Array<{ id: number; url: string; title: string; ogImage?: string }>
> {
  return await Promise.all(
    links.map(async (link) => {
      let ogImage = (await fetchOpenGraph(link.url))?.ogImage?.url;
      // If no Open Graph image was found, use the origin path
      if (!ogImage)
        ogImage = (await fetchOpenGraph(new URL(link.url).origin))?.ogImage
          ?.url;
      return {
        ...link,
        ogImage,
      };
    }),
  );
}

export default async function Dashboard({
  params,
}: {
  params: { id: number };
}) {
  const { userId } = auth();
  if (!userId) notFound();

  const dashboard = await api.dashboard.getDashboard(Number(params.id));

  void api.dashboard.getDashboard.prefetch(Number(params.id));

  // Ensure the dashboard exists and belongs to the user
  if (!dashboard || dashboard.userId !== userId) notFound();

  const links = await mergeOpenGraphImages(dashboard.dashboardLinks);

  return (
    <>
      {(dashboard.showName || dashboard.showDescription) && (
        <section className="container flex min-h-32 flex-col items-center justify-center">
          {dashboard.showName && (
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              {dashboard.name}
            </h1>
          )}
          {dashboard.showDescription && (
            <h2 className="text-xl font-semibold text-gray-500">
              {dashboard.description}
            </h2>
          )}
        </section>
      )}
      {dashboard.search && (
        <section className="container flex min-h-28 flex-col items-center justify-center">
          <SearchBar provider={dashboard.search} />
        </section>
      )}
      <section className="container flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 items-center gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="flex h-48 w-72 flex-col items-center justify-end gap-2 p-0 transition-all duration-300 hover:bg-blend-screen"
                variant="ghost"
                style={{
                  backgroundImage: `url(${link.ogImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="w-full rounded-bl-sm rounded-br-sm bg-slate-950 bg-opacity-60 px-2 py-2">
                  <span className="text-center text-xl font-medium opacity-100">
                    {link.title}
                  </span>
                </div>
              </Button>
            </a>
          ))}
          <CreateLink dashboardId={dashboard.id} />
        </div>
      </section>
    </>
  );
}
