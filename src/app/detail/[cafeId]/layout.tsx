export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh w-full">
      <main className="w-full">{children}</main>
    </div>
  );
}
