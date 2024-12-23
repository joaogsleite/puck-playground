import { Client } from './client'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPage } from '@/services/database'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>
}): Promise<Metadata> {
  const { path = [] } = await params

  return {
    title: getPage(`/${path.join('/')}`)?.root.props?.title,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ path: string[] }>
}) {
  const { path = [] } = await params
  const data = getPage(`/${path.join('/')}`)

  if (!data) {
    return notFound()
  }

  return (
    <Client data={data} />
  )
}
