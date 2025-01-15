import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPage } from '@/services/data/pages'
import { Render } from '@measured/puck'
import { getConfig } from '@/services/puck'
import { setRoutingCtx } from '@/components/routing-ctx/server'

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
  params: Promise<{ locale: string, path: string[] }>
}) {
  const { path = [] } = await params
  const data = getPage(`/${path.join('/')}`)  
  if (!data) {
    return notFound()
  }
  setRoutingCtx({ ...data.root.props })
  return (
    <Render config={getConfig(data)} data={data} />
  )
}
