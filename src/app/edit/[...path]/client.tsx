'use client'

import type { Data } from '@measured/puck'
import { Puck } from '@measured/puck'
import { getConfig, savePage } from '@/services/puck'
import LocaleSelect from '@/components/locale-select'

export function Client({ path, data }: { path: string; data: Data }) {
  return (
    <Puck
      config={getConfig(data)}
      data={data}
      overrides={{
        headerActions: ({children}) => <><LocaleSelect />{children}</>
      }}
      onPublish={(newData) => savePage(path, data, newData)}
    />
  );
}
