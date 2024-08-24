"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
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
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().optional(),
});

export default function DashboardCreate() {
  const router = useRouter();
  const auth = useAuth();
  const utils = api.useUtils();
  const createDashboard = api.dashboard.createDashboard.useMutation({
    onSuccess: async () => {
      await utils.dashboard.invalidate();
      router.replace("/dashboard");
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!auth.userId) {
      console.error("User is not authenticated");
      return;
    }

    const req = {
      name: data.name,
      description: data.description,
      userId: auth.userId,
    };
    console.log("Create dashboard:", req);
    createDashboard.mutate(req);
  }

  return (
    <>
      <section className="w-lg container flex min-h-64 flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create New Dashboard
        </h1>
      </section>
      <section className="container flex min-h-64 flex-col items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 max-w-screen-sm space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dashboard Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="A dashboard for my homepage."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button
                disabled={createDashboard.isPending}
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
              >
                {createDashboard.isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}
