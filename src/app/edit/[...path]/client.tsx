'use client'

import type { Data } from '@measured/puck'
import { Puck } from '@measured/puck'
import { getConfig, savePage } from '@/services/puck'
import LocaleSelect from '@/components/locale-select'
import { useRouter } from 'next/navigation'

export function Client({ path, data }: { path: string; data: Data }) {
  const router = useRouter()
  return (
    <Puck
      config={getConfig(data)}
      headerTitle={path}
      data={data}
      overrides={{
        headerActions: ({children}) => <><LocaleSelect />{children}</>
      }}
      onPublish={async (newData) => {
        await savePage(path, data, newData)
        router.push('/edit')
      }}
    />
  );
}
