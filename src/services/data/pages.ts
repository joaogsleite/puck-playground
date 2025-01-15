/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data } from '@measured/puck'
import fs from 'fs'
import path from 'path'

const jsonPath = path.resolve('src/data/pages.json')

function checkPage(page: Data, pagePath: string, routePath: string) {
  const routeParts = routePath.split('/').map(decodeURIComponent)
  const pageParts = pagePath.split('/').map(decodeURIComponent)
  const params: any = {}
  if (routeParts.length != pageParts.length) {
    return
  }
  for (let i = 0; i < pageParts.length; i++) {
    if (pageParts[i].startsWith(':')) {
      const key = pageParts[i].substring(1)
      params[key] = routeParts[i].startsWith(':') 
        ? (page.root.props as any)[key] || ''
        : routeParts[i]
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
export function getPage(routePath: string): Data | undefined {
  const allData: Record<string, Data> | null = fs.existsSync(jsonPath)
    ? JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    : undefined
  if (!allData) return
  for (const pagePath of Object.keys(allData)) {
    const page = checkPage(allData[pagePath], pagePath, routePath)
    if (page) return page
  }
  const newPage: Data = {
    root: { 
      props: {
        ...routePath.split('/').map(decodeURIComponent).filter((part) => 
          part.startsWith(':')
        ).reduce((result, part) => ({
          ...result,
          [part.substring(1)]: ''
        }), {})
      }
    },
    content: [],
  }
  return newPage
}

export function savePage(path: string, data: Data) {
  const allData: Record<string, Data> = fs.existsSync(jsonPath)
    ? JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    : {}

  allData[path] = data

  fs.writeFileSync(jsonPath, JSON.stringify(allData))
}