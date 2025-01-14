'use server'
import { fileExists, readJSON } from '@/helpers/fs'
import path from 'path'

interface Product {
  id: number
  name: string
  description: string
  price: number
}
const jsonPath = path.resolve('src/data/products.json')

export async function listProducts() {
  if (!fileExists(jsonPath)) return undefined
  const allData: Array<Product> = await readJSON(jsonPath)
  return allData
}

export async function getProduct(id?: number) {
  if (!id) return
  const allProducts = await listProducts()
  if (!allProducts) return undefined
  return allProducts.find(p => p.id === id)
}
