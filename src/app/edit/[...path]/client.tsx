'use client'

import type { Data } from '@measured/puck'
import { Puck } from '@measured/puck'
import config from '@/services/puck'
import LocaleProvider from '@/components/locale-ctx/client'
import LocaleSelect from '@/components/locale-select'

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  return (
    <LocaleProvider>{() =>
      <Puck
        config={config}
        data={data}
        overrides={{
            headerActions: ({children}) => <><LocaleSelect />{children}</>
        }}
        onPublish={async (data) => {
          await fetch('/api/edit', {
            method: 'post',
            body: JSON.stringify({ data, path }),
          });
        }}
      />
    }</LocaleProvider>
  );
}
