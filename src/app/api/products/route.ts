import { NextResponse } from 'next/server'
import { listProducts } from '@/services/data/products'

export async function GET() {
  const products = listProducts()
  return NextResponse.json(products)
}
