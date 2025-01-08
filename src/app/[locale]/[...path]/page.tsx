import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPage } from '@/services/database'
import { Render } from '@measured/puck'
import config from '@/services/puck'
import { setLocale } from '@/components/locale-ctx/server'

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
  const { locale, path = [] } = await params
  const data = getPage(`/${path.join('/')}`)

  setLocale(locale)

  if (!data) {
    return notFound()
  }

  return (
    <Render config={config} data={data} />
  )
}
