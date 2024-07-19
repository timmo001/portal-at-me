import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { cn } from "~/lib/utils";
import { ModeToggle } from "~/components/theme-toggle";
import { ThemeProvider } from "~/components/ui/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Portal@Me",
  description: "A portal to your world.",
  icons: [{ rel: "icon", url: "/icon" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-background min-h-screen font-sans antialiased",
        GeistSans.variable,
      )}
    >
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModeToggle />
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
