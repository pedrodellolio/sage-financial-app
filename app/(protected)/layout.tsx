import Footer from "@/components/footer";
import Header from "@/components/header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="min-h-screen flex flex-col items-center py-10 px-14">
        {children}
      </main>
      <Footer />
    </div>
  );
}
