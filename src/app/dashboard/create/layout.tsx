export default function SignedInDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* <section className="container flex min-h-2 flex-col items-center justify-center gap-12 bg-gradient-to-b from-slate-900" /> */}
      {children}
    </>
  );
}
