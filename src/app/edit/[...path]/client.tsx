'use client'

import type { Data } from '@measured/puck'
import { Puck } from '@measured/puck'
import { getConfig } from '@/services/puck'
import RoutingProvider from '@/components/routing-ctx/client'
import LocaleSelect from '@/components/locale-select'

export function Client({ path, data }: { path: string; data: Data }) {
  return (
    <RoutingProvider value={{ ...data.root?.props }}>{() =>
      <Puck
        config={getConfig(data)}
        data={data}
        overrides={{
          headerActions: ({children}) => <><LocaleSelect />{children}</>
        }}
        onPublish={async (data) => {
          await fetch('/api/pages', {
            method: 'post',
            body: JSON.stringify({ data, path }),
          });
        }}
      />
    }</RoutingProvider>
  );
}
