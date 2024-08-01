import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "~/components/ui/button";

export default async function Home() {
  return (
    <main className="flex min-h-[48.0rem] flex-col items-center justify-center bg-gradient-to-b from-slate-800 dark:from-slate-900">
      <section className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Portal<span className="text-indigo-600">@</span>Me
        </h1>
        <p className="text-center text-2xl font-light">
          A portal to your world.
        </p>
      </section>
      <section className="flex flex-col items-center gap-2">
        <SignedOut>
          <SignUpButton mode="modal">
            <Button variant="default" size="lg">
              Get Started
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <Button variant="default" size="lg">
              Dashboard
            </Button>
          </Link>
        </SignedIn>
      </section>
    </main>
  );
}
