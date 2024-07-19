"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestLink() {
  const [latestLink] = api.link.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createLink = api.link.create.useMutation({
    onSuccess: async () => {
      await utils.link.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestLink ? (
        <p className="truncate">Your most recent link: {latestLink.title}</p>
      ) : (
        <p>You have no links yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createLink.isPending}
        >
          {createLink.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
