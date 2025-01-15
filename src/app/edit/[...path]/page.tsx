
import '@measured/puck/puck.css'
import { Client } from './client'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getOrCreatePage, getPagePath } from '@/services/data/pages'

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
  const path = decodeURIComponent(`/${pathArray.join('/')}`)
  const page = getOrCreatePage(path)
  const pagePath = getPagePath(page)
  if (pagePath && pagePath !== path) {
    return redirect(`/edit/${pagePath}`)
  }
  return (
    <Client path={path} data={page} />
  )
}

export const dynamic = 'force-dynamic'
