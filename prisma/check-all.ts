import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const users = await prisma.user.findMany({ select: { id: true, email: true, isPaid: true } })
  console.log('=== USERS ===')
  console.log(JSON.stringify(users, null, 2))

  const progress = await prisma.progress.findMany()
  console.log('\n=== PROGRESS ===')
  console.log(JSON.stringify(progress, null, 2))

  const xp = await prisma.xpRecord.findMany()
  console.log('\n=== XP RECORDS ===')
  console.log(JSON.stringify(xp, null, 2))

  const streak = await prisma.streak.findMany()
  console.log('\n=== STREAKS ===')
  console.log(JSON.stringify(streak, null, 2))

  const enrollments = await prisma.enrollment.findMany()
  console.log('\n=== ENROLLMENTS ===')
  console.log(JSON.stringify(enrollments, null, 2))

  await prisma.$disconnect()
}
main()
