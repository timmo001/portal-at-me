import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import { HydrateClient } from "~/trpc/server";

export default function SignedInLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-96 flex-col items-center justify-start bg-gradient-to-b from-slate-900">
      <SignedOut>
        <section className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <p className="text-center text-2xl font-light">
            You must be{" "}
            <span className="text-indigo-600">
              <SignInButton mode="modal">signed in</SignInButton>
            </span>{" "}
            to access this page
          </p>
        </section>
      </SignedOut>
      <SignedIn>
        <HydrateClient>{children}</HydrateClient>
      </SignedIn>
    </main>
  );
}
