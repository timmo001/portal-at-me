import { redirect } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import { HydrateClient } from "~/trpc/server";

export default function SignedInLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SignedOut>{redirect("/")}</SignedOut>
      <SignedIn>
        <HydrateClient>{children}</HydrateClient>
      </SignedIn>
    </>
  );
}
