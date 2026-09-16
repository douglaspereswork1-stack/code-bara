import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const modules = await prisma.module.findMany({
    include: { lessons: { select: { id: true, title: true } } },
    orderBy: { order: 'asc' },
  })
  console.log('=== MODULES ===')
  for (const m of modules) {
    console.log(`${m.order}. ${m.title} (${m.slug}) — ${m.lessons.length} aulas`)
    for (const l of m.lessons) {
      console.log(`   - ${l.title}`)
    }
  }
  await prisma.$disconnect()
}
main()
