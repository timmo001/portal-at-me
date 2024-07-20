"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

export default function DashboardUpdate({
  params,
}: {
  params: { id: number };
}) {
  const [dashboard] = api.dashboard.getDashboard.useSuspenseQuery(
    Number(params.id),
  );

  const router = useRouter();
  const utils = api.useUtils();
  const updateDashboard = api.dashboard.updateDashboard.useMutation({
    onSuccess: async () => {
      await utils.dashboard.invalidate();
      router.replace(`/dashboard/${params.id}`);
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: dashboard?.name || "",
      description: dashboard?.description || "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const req = {
      id: Number(params.id),
      name: data.name,
      description: data.description,
    };
    console.log("Update dashboard:", req);
    updateDashboard.mutate(req);
  }

  return (
    <>
      <section className="w-lg container flex min-h-64 flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Edit{" "}
          <span className="text-indigo-600">
            {form.formState.defaultValues?.name || "Dashboard"}
          </span>
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
                disabled={updateDashboard.isPending}
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
              >
                {updateDashboard.isPending ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}
