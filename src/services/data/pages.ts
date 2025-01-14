/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data } from '@measured/puck'
import fs from 'fs'
import path from 'path'

const jsonPath = path.resolve('src/data/pages.json')

function checkPage(page: Data, pagePath: string, routePath: string) {
  const routeParts = routePath.split('/')
  const pageParts = pagePath.split('/')
  const params: any = {}
  if (routeParts.length != pageParts.length) {
    return
  }
  for (let i = 0; i < pageParts.length; i++) {
    if (pageParts[i].startsWith(':')) {
      params[pageParts[i].substring(1)] = decodeURIComponent(routeParts[i])
    } else if (pageParts[i] !== routeParts[i]) {
      return
    }
  }
  return {
    ...page,
    root: {
      ...page.root,
      props: {
        ...page.root.props,
        fullPath: pagePath,
        ...params
      }
    }
  }
}
export function getPage(routePath: string) {
  const allData: Record<string, Data> | null = fs.existsSync(jsonPath)
    ? JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    : undefined
  if (!allData) return
  for (const pagePath of Object.keys(allData)) {
    const page = checkPage(allData[pagePath], pagePath, routePath)
    if (page) return page
  }
}

export function savePage(path: string, data: Data) {
  const allData: Record<string, Data> = fs.existsSync(jsonPath)
    ? JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    : {}

  allData[path] = data

  fs.writeFileSync(jsonPath, JSON.stringify(allData))
}