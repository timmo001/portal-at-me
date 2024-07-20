"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  url: z.string().url({
    message: "Invalid URL",
  }),
});

export function CreateLink({ dashboardId }: { dashboardId: number }) {
  const [createLinkOpen, setCreateLinkOpen] = useState<boolean>(false);

  const router = useRouter();
  const utils = api.useUtils();
  const createLink = api.link.createLink.useMutation({
    onSuccess: async () => {
      await utils.dashboard.invalidate();
      await utils.link.invalidate();

      setCreateLinkOpen(false);
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const req = {
      title: data.title,
      url: data.url,
      dashboardId: dashboardId,
    };
    console.log("Create link:", req);
    createLink.mutate(req);
  }

  return (
    <>
      <Button
        className="flex h-48 w-72 flex-col items-center justify-center gap-2 opacity-30 transition-all duration-300 hover:opacity-100"
        variant="ghost"
        onClick={() => setCreateLinkOpen(true)}
      >
        <Link size={24} />
        <span className="text-center text-xl font-medium">New</span>
      </Button>
      <Dialog open={createLinkOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Link</DialogTitle>
            <DialogDescription>
              Add a new link to this dashboard.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Link Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button
                  disabled={createLink.isPending}
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full"
                >
                  {createLink.isPending ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
