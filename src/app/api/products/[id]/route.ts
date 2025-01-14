import { NextRequest, NextResponse } from 'next/server'
import { getProduct } from '@/services/data/products'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const product = await getProduct(id)
  return NextResponse.json(product)
}
