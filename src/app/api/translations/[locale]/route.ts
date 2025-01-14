import { getTranslations } from '@/services/translations'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale
  const translations = await getTranslations(locale)
  return NextResponse.json(translations)
}
