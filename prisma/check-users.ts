import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const users = await prisma.user.findMany({ select: { email: true, name: true, passwordHash: true, isPaid: true } })
  console.log(JSON.stringify(users, null, 2))
  await prisma.$disconnect()
}
main()
