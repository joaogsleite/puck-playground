import { ComponentConfig } from '@measured/puck'

export interface IHeadingBlock {
  title: string
}

export const HeadingBlock: ComponentConfig<IHeadingBlock> = {
  fields: {
    title: { type: 'text' },
  },
  defaultProps: {
    title: 'Heading',
  },
  render: ({ title }) => (
    <div style={{ padding: 64 }}>
      <h1>{title}</h1>
    </div>
  ),
}