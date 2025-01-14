
import '@measured/puck/puck.css'
import { Client } from './client'
import { Metadata } from 'next'
import { getPage } from '@/services/data/pages'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>
}): Promise<Metadata> {
  const { path = [] } = await params

  return {
    title: `Editing /${path.map((p) => decodeURIComponent(p)).join('/')}`,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ path: string[] }>
}) {
  const { path: pathArray = [] } = await params
  const path = `/${pathArray.join('/')}`
  const data = getPage(path)
  if (!data) return null
  return (
    <Client path={path} data={data} />
  )
}

export const dynamic = 'force-dynamic'
