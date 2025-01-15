'use server'

import { fileExists, readJSON } from "@/helpers/fs"

const jsonPath = 'src/data/translations.json'

export async function getTranslations(locale: string) {
  if (!fileExists(jsonPath)) return undefined
  const translations = await readJSON(jsonPath)
  return translations?.[locale] || {}
}
