'use client'

import type { Data } from '@measured/puck'
import { Puck } from '@measured/puck'
import config from '@/services/puck'

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  return (
    <Puck
      config={config}
      data={data}
      onPublish={async (data) => {
        await fetch('/api/edit', {
          method: 'post',
          body: JSON.stringify({ data, path }),
        });
      }}
    />
  );
}
