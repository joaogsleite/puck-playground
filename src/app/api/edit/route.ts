import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { savePage } from '@/services/database'

export async function POST(request: Request) {
  const payload = await request.json()

  savePage(payload.path, payload.data)

  revalidatePath(payload.path)

  return NextResponse.json({ status: 'ok' })
}
