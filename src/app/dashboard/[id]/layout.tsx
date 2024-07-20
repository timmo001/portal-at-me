export default function SignedInDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <section className="container flex flex-col items-center justify-center gap-12 px-4 py-16"></section>
      {children}
    </>
  );
}
