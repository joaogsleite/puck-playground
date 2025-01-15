/* eslint-disable @typescript-eslint/no-explicit-any */
import { fileExists, readJSON } from '@/helpers/fs'
import { Data } from '@measured/puck'
import fs from 'fs'
import path from 'path'

const jsonPath = path.resolve('src/data/pages.json')

export type IPage = Data<Record<string, unknown>, Record<string, unknown>>

function checkPage(page: IPage, pagePath: string, routePath: string) {
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
        fullPath: pagePath,
        ...page.root.props,
        ...params,
      },
    }
  }
}

export function getPagePath(page: IPage) {
  return page.root.props?.fullPath as string | undefined
}
export function getOrCreatePage(routePath: string) {
  const page = getPage(routePath)
  if (page) return page
  else return {
    root: { 
      props: {
        fullPath: routePath,
        ...routePath.split('/').filter((part) => 
          part.startsWith(':')
        ).reduce((result, part) => ({
          ...result,
          [part.substring(1)]: ''
        }), {})
      },
    },
    content: [],
  }
}
export function getPage(routePath: string): IPage | undefined {
  const allData: Record<string, Data> = fs.existsSync(jsonPath)
    ? JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    : {}
  for (const pagePath of Object.keys(allData)) {
    const page = checkPage(allData[pagePath], pagePath, routePath)
    if (page) return page
  }
}

export async function listPages() {
  if (!await fileExists(jsonPath)) return []
  const allData: Record<string, Data> = await readJSON(jsonPath)
  return Object.keys(allData).map((path) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fullPath, ...props } = allData[path].root.props as Record<string, unknown>
    return { path, props }
  })
}

export function savePage(path: string, data: Data) {
  const allData: Record<string, Data> = fs.existsSync(jsonPath)
    ? JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    : {}

  allData[path] = data

  fs.writeFileSync(jsonPath, JSON.stringify(allData))
}