import { Data } from '@measured/puck'
import fs from 'fs'
import path from 'path'

const databasePath = path.resolve('database.json')
console.log(databasePath)

export function getPage(path: string) {
  const allData: Record<string, Data> | null = fs.existsSync(databasePath)
    ? JSON.parse(fs.readFileSync(databasePath, 'utf-8'))
    : null

  return allData ? allData[path] : null
}

export function savePage(path: string, data: Data) {
  const allData: Record<string, Data> = fs.existsSync(databasePath)
    ? JSON.parse(fs.readFileSync(databasePath, 'utf-8'))
    : {}

  allData[path] = data

  fs.writeFileSync(databasePath, JSON.stringify(allData))
}