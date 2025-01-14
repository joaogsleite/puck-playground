import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { savePage } from '@/services/data/pages'

export async function POST(request: Request) {
  const payload = await request.json()
  const path = decodeURIComponent(payload.path)

  savePage(path, payload.data)

  revalidatePath(path)

  return NextResponse.json({ status: 'ok' })
}
