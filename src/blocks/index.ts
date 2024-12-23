import { HeadingBlock, IHeadingBlock } from './heading'
import { IParagraphBlock, ParagraphBlock } from './paragraph'

export interface IBlocks {
  HeadingBlock: IHeadingBlock
  ParagraphBlock: IParagraphBlock
}

export const blocks = {
  HeadingBlock,
  ParagraphBlock
}