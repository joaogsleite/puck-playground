import { NextResponse } from 'next/server'
import { listProducts } from '@/services/data/products/server'

export async function GET() {
  const products = listProducts()
  return NextResponse.json(products)
}
