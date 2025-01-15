import React from 'react'
import ProductInfo from '@/components/product-info'
import { ComponentConfig } from '@measured/puck'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IProductInfoBlock {
  size: 'small' | 'large'
}

export const ProductInfoBlock: ComponentConfig<IProductInfoBlock> = {
  resolveFields: () => ({
    size: {
      label: 'Size',
      type: 'select',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'large', label: 'Large' },
      ]
    }
  }),
  defaultProps: {
    size: 'small'
  },
  render: ({ size }) => <ProductInfo size={size} />
}