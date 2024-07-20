"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";

export const searchNameMap: Record<string, string> = {
  bing: "Bing",
  chatgpt: "ChatGPT",
  duckduckgo: "DuckDuckGo",
  google: "Google",
};

const FormSchema = z.object({
  query: z.string().min(1, {
    message: "Query is required",
  }),
});

export function SearchBar({ provider }: { provider: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Search:", { provider, query: data.query });
    switch (provider) {
      case "bing":
        window.open(`https://www.bing.com/search?q=${data.query}`);
        break;
      case "chatgpt":
        window.open(`https://chatgpt.com/?q=${data.query}`);
        break;
      case "duckduckgo":
        window.open(`https://duckduckgo.com/?q=${data.query}`);
        break;
      case "google":
        window.open(`https://www.google.com/search?q=${data.query}`);
        break;
      default:
        console.error("Unknown search provider:", provider);
        return;
    }

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row gap-1"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="w-96">
              <FormControl>
                <Input placeholder="Search" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline" size="icon">
          <Search />
        </Button>
      </form>
    </Form>
  );
}
