import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import { cn } from "~/lib/utils";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import { ThemePicker } from "~/components/theme-picker";
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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#5b21b6",
          colorBackground: "#020617",
          colorInputText: "#ffffff",
        },
      }}
    >
      <html
        lang="en"
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

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
                <div className="flex flex-row items-center gap-2">
                  <ThemePicker />
                  <SignedOut>
                    <div className="transform rounded-md bg-violet-900 bg-opacity-60 px-4 py-2 text-white shadow-lg drop-shadow-2xl transition duration-300 hover:scale-105">
                      <SignInButton mode="modal" />
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </header>
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
