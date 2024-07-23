import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 400 });
  }

  const { profileId, type, value, labelId, budgetId } = await req.json();
  const result = await prisma.budgetGoal.create({
    data: { type, value, profileId, labelId, budgetId },
  });
  return NextResponse.json({ success: result }, { status: 200 });
}
