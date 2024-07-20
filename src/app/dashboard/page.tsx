import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";

export default async function Dashboard() {
  return (
    <>
      <section className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
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
    </>
  );
}
