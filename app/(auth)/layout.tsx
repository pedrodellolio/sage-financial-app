import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function AuthRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) return redirect("/dashboard");

  return (
    <div>
      <main className="min-h-screen flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}
