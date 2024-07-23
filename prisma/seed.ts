import { PrismaClient, SystemLabel } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from "crypto";

const systemLabels: SystemLabel[] = [
  { title: "Mercado", colorHex: "#FFF", id: crypto.randomUUID() },
  { title: "Saúde", colorHex: "#FFF", id: crypto.randomUUID() },
  { title: "Casa", colorHex: "#FFF", id: crypto.randomUUID() },
  { title: "Roupa", colorHex: "#FFF", id: crypto.randomUUID() },
  { title: "Restaurante", colorHex: "#FFF", id: crypto.randomUUID() },
  { title: "Lazer", colorHex: "#FFF", id: crypto.randomUUID() },
  { title: "Viagem", colorHex: "#FFF", id: crypto.randomUUID() },
  { title: "Educação", colorHex: "#FFF", id: crypto.randomUUID() },
  { title: "Streaming", colorHex: "#FFF", id: crypto.randomUUID() },
  { title: "iFood", colorHex: "#FFF", id: crypto.randomUUID() },
  { title: "Transporte", colorHex: "#FFF", id: crypto.randomUUID() },
  { title: "Pets", colorHex: "#FFF", id: crypto.randomUUID() },
];

async function main() {
  await prisma.systemLabel.deleteMany();
  const labels = await prisma.systemLabel.createMany({
    data: systemLabels,
  });
  console.log({ labels });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
