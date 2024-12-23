import { ComponentConfig } from '@measured/puck'

export interface IParagraphBlock {
  copy: string
}

export const ParagraphBlock: ComponentConfig<IParagraphBlock> = {
  fields: {
    copy: { type: 'text' },
  },
  defaultProps: {
    copy: 'Hello world',
  },
  render: ({ copy }) => (
    <p style={{padding: '0 64px'}}>
      {copy}
    </p>
  ),
}