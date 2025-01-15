'use client'

import type { Data } from '@measured/puck'
import { Puck } from '@measured/puck'
import { getConfig } from '@/services/puck'
import LocaleSelect from '@/components/locale-select'
import { setCtx } from '@/components/routing-ctx/client'

export function Client({ path, data }: { path: string; data: Data }) {
  return (
    <Puck
      config={getConfig(data)}
      data={data}
      overrides={{
        headerActions: ({children}) => <><LocaleSelect />{children}</>
      }}
      onChange={(data) => {
        setCtx(data.root.props || {})
      }}
      onPublish={async (data) => {
        await fetch('/api/pages', {
          method: 'post',
          body: JSON.stringify({ data, path }),
        });
      }}
    />
  );
}
