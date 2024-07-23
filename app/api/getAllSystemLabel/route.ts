import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!session || !userId) {
    return NextResponse.json({ error: "Not authorized" }, { status: 400 });
  }

  const labels = await prisma.systemLabel.findMany();

  return NextResponse.json(labels, { status: 200 });
}
