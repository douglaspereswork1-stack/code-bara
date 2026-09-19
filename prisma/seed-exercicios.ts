// Exercícios com saída verificada (prisma/data/exercicios.json). Idempotente: casa por lessonTitle+title.
import { PrismaClient } from '@prisma/client'
import data from './data/exercicios.json'
const p = new PrismaClient()
async function main() {
  const order: Record<string, number> = {}
  for (const e of data) {
    const lesson = await p.lesson.findFirst({ where: { title: e.lessonTitle }, select: { id: true } })
    if (!lesson) { console.warn('aula não encontrada:', e.lessonTitle); continue }
    order[lesson.id] = (order[lesson.id] ?? 0) + 1
    const fields = { description: e.description, starterCode: e.starterCode, solution: e.solution, testCases: JSON.stringify(e.testCases), xpReward: e.xpReward, order: order[lesson.id] }
    const found = await p.exercise.findFirst({ where: { lessonId: lesson.id, title: e.title }, select: { id: true } })
    if (found) await p.exercise.update({ where: { id: found.id }, data: fields })
    else await p.exercise.create({ data: { lessonId: lesson.id, title: e.title, ...fields } })
    console.log(found ? 'atualizado' : 'criado', '|', e.lessonTitle, '→', e.title)
  }
}
main().finally(() => p.$disconnect())
