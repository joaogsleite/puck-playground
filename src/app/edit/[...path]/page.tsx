
import '@measured/puck/puck.css'
import { Client } from './client'
import { Metadata } from 'next'
import { getPage } from '@/services/database'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ puckPath: string[] }>
}): Promise<Metadata> {
  const { puckPath = [] } = await params
  const path = `/${puckPath.join('/')}`

  return {
    title: 'Editing: ' + path,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ puckPath: string[] }>
}) {
  const { puckPath = [] } = await params
  const path = `/${puckPath.join('/')}`
  const data = getPage(path)

  return (
    <Client path={path} data={data || {}} />
  )
}

export const dynamic = 'force-dynamic'
