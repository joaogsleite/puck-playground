import React from 'react'
import ProductInfo from '@/components/product-info'
import { ComponentConfig } from '@measured/puck'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IProductInfoBlock {}

export const ProductInfoBlock: ComponentConfig<IProductInfoBlock> = {
  resolveFields: () => ({}),
  defaultProps: {},
  render: () => <ProductInfo />
}