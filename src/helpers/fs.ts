import { access, readFile } from 'fs/promises'

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error === 'ENOENT') {
      return false
    }
    throw error
  }
}

export async function readJSON(jsonPath: string) {
  const contents = await readFile(jsonPath, 'utf-8')
  return JSON.parse(contents)
}