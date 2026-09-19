// Compartilhado entre o console (blocos :::interactive, sem XP) e /api/progress/exercise (com XP).
export function normalizeOutput(text: string): string {
  return text.trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '')
}

// Exercise.testCases: JSON array de linhas esperadas, ou texto puro (1 linha)
export function parseExpected(testCases: string): string[] {
  try {
    const parsed = JSON.parse(testCases)
    return Array.isArray(parsed) ? parsed.map(String) : [String(parsed)]
  } catch {
    return testCases.trim() ? [testCases.trim()] : []
  }
}

export function outputMatches(expected: string[], actual: string[]): boolean {
  return expected.length === actual.length &&
    expected.every((e, i) => normalizeOutput(e) === normalizeOutput(actual[i]))
}
