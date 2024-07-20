import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { type Metadata } from "next";

import { cn } from "~/lib/utils";
import { Menu } from "~/components/menu";
import { ThemeProvider } from "~/components/ui/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Portal@Me",
  description: "A portal to your world.",
  icons: [{ rel: "icon", url: "/icon" }],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
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
            <header className="flex flex-row justify-between gap-2 p-2">
              <div className="flex items-center gap-2">
                {/* <h1 className="text-2xl font-semibold">Portal@Me</h1> */}
              </div>
              <Menu />
            </header>
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
