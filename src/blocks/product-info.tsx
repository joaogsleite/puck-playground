import ProductInfo from '@/components/product-info'
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
  render: ({ productId }) => <ProductInfo id={productId} />
}