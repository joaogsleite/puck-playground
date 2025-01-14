import { IHeadingBlock, HeadingBlock } from './heading'
import { IParagraphBlock, ParagraphBlock } from './paragraph'
import { IProductInfoBlock, ProductInfoBlock } from './product-info'

export interface IBlocks {
  HeadingBlock: IHeadingBlock
  ParagraphBlock: IParagraphBlock
  ProductInfoBlock: IProductInfoBlock
}

export const blocks = {
  HeadingBlock,
  ParagraphBlock,
  ProductInfoBlock,
}