import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";

export default async function Home() {
  // const hello = await api.link.hello({ text: "from Portal@Me" });

  // void api.link.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Portal<span className="text-indigo-600">@</span>Me
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-lg">A portal to your world.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button variant="default" size="lg">
              <SignedOut>
                <SignUpButton mode="modal">Get Started</SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">Dashboard</Link>
              </SignedIn>
            </Button>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
