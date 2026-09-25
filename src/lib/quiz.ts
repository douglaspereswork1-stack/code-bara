// QuizQuestion.options é uma String com JSON: [{ text, correct }]
export type QuizOption = { text: string; correct: boolean }

export function parseQuizOptions(options: string): QuizOption[] {
  return JSON.parse(options) as QuizOption[]
}
