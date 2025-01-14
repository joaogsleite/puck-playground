/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import ProductInfo from '@/components/product-info'
import { useRoutingCtx } from '@/components/routing-ctx'
import { ComponentConfig } from '@measured/puck'

export interface IProductInfoBlock {
  productId: number
}

export const ProductInfoBlock: ComponentConfig<IProductInfoBlock> = {
  resolveFields: () => ({
    productId: { type: 'number', label: 'Product ID' },
  }),
  defaultProps: {
    productId: 1,
  },
  render: ({ productId }) => {
    const [ctx] = useRoutingCtx()
    const id = ctx.id === ':id' ? productId : Number(ctx.id)
    return <ProductInfo id={id} />
  }
}