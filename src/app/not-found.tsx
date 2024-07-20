import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-96 flex-col items-center justify-start">
      <section className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h2 className="text-center text-2xl font-light">404: Page not found</h2>
        <SignedOut>
          <Link href="/">
            <Button variant="default" size="lg">
              Return Home
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <Button variant="default" size="lg">
              Return to Dashboard
            </Button>
          </Link>
        </SignedIn>
      </section>
    </main>
  );
}
