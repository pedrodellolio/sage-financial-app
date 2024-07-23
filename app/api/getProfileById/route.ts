import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const { searchParams } = new URL(req.url);
  const profileId = searchParams.get("id") ?? undefined;

  if (!session || !userId) {
    return NextResponse.json({ error: "Not authorized" }, { status: 400 });
  }

  const profile = await prisma.profile.findFirst({
    where: { id: profileId },
  });

  return NextResponse.json({ success: profile }, { status: 200 });
}
