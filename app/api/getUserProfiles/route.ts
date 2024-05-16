import { getProfiles } from "@/app/actions/profile";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!session || !userId) {
    return NextResponse.json({ error: "Not authorized" }, { status: 400 });
  }

  const profiles = await getProfiles(userId);
  return NextResponse.json(profiles);
}
